import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaHeart,
  FaLock,
  FaCrown,
  FaCalendarAlt,
  FaUser,
  FaBookOpen,
} from 'react-icons/fa';

const categories = [
  'All',
  'Personal Growth',
  'Career',
  'Relationships',
  'Mindset',
  'Mistakes Learned',
];

const emotions = [
  'All',
  'Motivational',
  'Sad',
  'Realization',
  'Gratitude',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'mostViewed', label: 'Most Viewed' },
  { value: 'mostSaved', label: 'Most Saved' },
];

const PublicLessons = () => {
  const { user } = useAuth();
  const axios = useAxios();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEmotion, setSelectedEmotion] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 9;

  // Fetch current user to check premium status
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch all public lessons
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['publicLessons'],
    queryFn: async () => {
      const res = await axios.get('/lessons/public');
      return res.data;
    },
  });

  // Filter and sort lessons
  const filteredLessons = lessons
    .filter((lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      const matchesEmotion = selectedEmotion === 'All' || lesson.emotion === selectedEmotion;
      
      return matchesSearch && matchesCategory && matchesEmotion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0);
        case 'mostSaved':
          return (b.favorites || 0) - (a.favorites || 0);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + lessonsPerPage);

  const LessonCard = ({ lesson }) => {
    const isPremiumLesson = lesson.accessLevel === 'Premium';
    const canViewPremium = currentUser?.isPremium || lesson.authorEmail === user?.email;
    const isBlurred = isPremiumLesson && !canViewPremium;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 ${
          isBlurred ? 'relative' : ''
        }`}
      >
        {/* Premium Overlay */}
        {isBlurred && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
            <div className="text-center text-white p-6">
              <FaLock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Lesson</h3>
              <p className="mb-4">Upgrade to view this exclusive content</p>
              <Link
                to="/pricing"
                className="btn btn-warning btn-sm"
              >
                <FaCrown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Link>
            </div>
          </div>
        )}

        {/* Lesson Image */}
        {lesson.image && (
          <div className="h-48 overflow-hidden">
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full h-full object-cover ${isBlurred ? 'blur-sm' : ''}`}
            />
          </div>
        )}

        <div className={`p-6 ${isBlurred ? 'blur-sm' : ''}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-2">
                {lesson.title}
              </h3>
              <p className="text-base-content/70 text-sm line-clamp-3 mb-3">
                {lesson.description}
              </p>
            </div>
            {isPremiumLesson && (
              <div className="ml-2">
                <span className="badge badge-warning gap-1">
                  <FaCrown className="w-3 h-3" />
                  Premium
                </span>
              </div>
            )}
          </div>

          {/* Categories and Emotion */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-primary badge-sm">{lesson.category}</span>
            <span className="badge badge-secondary badge-sm">{lesson.emotion}</span>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={lesson.authorImage || '/default-avatar.png'}
              alt={lesson.authorName}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-base-content">
                {lesson.authorName}
              </p>
              <p className="text-xs text-base-content/60 flex items-center gap-1">
                <FaCalendarAlt className="w-3 h-3" />
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-base-content/60">
              <span className="flex items-center gap-1">
                <FaEye className="w-4 h-4" />
                {lesson.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <FaHeart className="w-4 h-4" />
                {lesson.favorites || 0}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={isBlurred ? '/pricing' : `/lesson/${lesson._id}`}
            className={`btn w-full ${
              isBlurred
                ? 'btn-warning'
                : 'btn-primary'
            }`}
          >
            {isBlurred ? (
              <>
                <FaCrown className="w-4 h-4 mr-2" />
                Upgrade to View
              </>
            ) : (
              <>
                <FaBookOpen className="w-4 h-4 mr-2" />
                Read Lesson
              </>
            )}
          </Link>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Public Life Lessons
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Discover wisdom and insights shared by our community. Learn from others' experiences and grow together.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 p-6 rounded-2xl shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Emotion Filter */}
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="select select-bordered w-full"
            >
              {emotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-base-content/60">
            Showing {paginatedLessons.length} of {filteredLessons.length} lessons
          </div>
        </motion.div>

        {/* Lessons Grid */}
        {paginatedLessons.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FaBookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-base-content/60 mb-2">
              No lessons found
            </h3>
            <p className="text-base-content/50">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="join">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="join-item btn"
              >
                «
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`join-item btn ${
                    currentPage === page ? 'btn-active' : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="join-item btn"
              >
                »
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;