import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import LessonCard from '../LessonCard/LessonCard';
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

const emotions = ['All', 'Motivational', 'Sad', 'Realization', 'Gratitude'];

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
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || lesson.category === selectedCategory;
      const matchesEmotion =
        selectedEmotion === 'All' || lesson.emotion === selectedEmotion;

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
  const paginatedLessons = filteredLessons.slice(
    startIndex,
    startIndex + lessonsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className=''>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Public Life Lessons
          </h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Discover wisdom and insights shared by our community. Learn from
            others' experiences and grow together.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 p-6 rounded-2xl shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-3 gap-4">
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
            Showing {paginatedLessons.length} of {filteredLessons.length}{' '}
            lessons
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`join-item btn ${
                      currentPage === page ? 'btn-active' : ''
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
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
