import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaBookOpen,
  FaStar,
  FaTrash,
  FaEye,
  FaHeart,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCrown,
  FaGlobe,
  FaLock,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const categories = [
  'All',
  'Personal Growth',
  'Career',
  'Relationships',
  'Mindset',
  'Mistakes Learned',
];

const ManageLessons = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPrivacy, setFilterPrivacy] = useState('All');
  const [filterAccess, setFilterAccess] = useState('All');
  const [filterFeatured, setFilterFeatured] = useState('All');

  // Fetch all lessons
  const { data: allLessons = [], isLoading } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const res = await axios.get('/admin/lessons');
      return res.data;
    },
  });

  // Toggle featured status mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, isFeatured }) => {
      return axios.patch(`/admin/lessons/${id}/featured`, { isFeatured: !isFeatured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allLessons']);
      toast.success('Featured status updated!');
    },
    onError: (error) => {
      toast.error('Failed to update featured status');
      console.error(error);
    },
  });

  // Delete lesson mutation
  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allLessons']);
      toast.success('Lesson deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete lesson');
      console.error(error);
    },
  });

  // Filter lessons
  const filteredLessons = allLessons.filter(lesson => {
    const matchesSearch = lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.authorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || lesson.category === filterCategory;
    const matchesPrivacy = filterPrivacy === 'All' || lesson.privacy === filterPrivacy;
    const matchesAccess = filterAccess === 'All' || lesson.accessLevel === filterAccess;
    const matchesFeatured = filterFeatured === 'All' || 
                           (filterFeatured === 'Featured' && lesson.isFeatured) ||
                           (filterFeatured === 'Not Featured' && !lesson.isFeatured);
    
    return matchesSearch && matchesCategory && matchesPrivacy && matchesAccess && matchesFeatured;
  });

  const handleToggleFeatured = (lesson) => {
    const actionText = lesson.isFeatured ? 'remove from featured' : 'make featured';
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        toggleFeaturedMutation.mutate({ id: lesson._id, isFeatured: lesson.isFeatured });
      }
    });
  };

  const handleDeleteLesson = (lesson) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete "${lesson.title}" and all its data!`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(lesson._id);
      }
    });
  };

  // Calculate stats
  const publicLessons = allLessons.filter(l => l.privacy === 'Public').length;
  const privateLessons = allLessons.filter(l => l.privacy === 'Private').length;
  const featuredLessons = allLessons.filter(l => l.isFeatured).length;
  const premiumLessons = allLessons.filter(l => l.accessLevel === 'Premium').length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Manage Lessons
        </h1>
        <p className="text-base-content/70 text-lg">
          Moderate content, feature lessons, and manage platform content
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-blue-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white">
              <FaBookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{allLessons.length}</p>
              <p className="text-base-content/60">Total Lessons</p>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white">
              <FaGlobe className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{publicLessons}</p>
              <p className="text-base-content/60">Public Lessons</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white">
              <FaStar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{featuredLessons}</p>
              <p className="text-base-content/60">Featured</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/10 p-6 rounded-2xl border border-base-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white">
              <FaCrown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{premiumLessons}</p>
              <p className="text-base-content/60">Premium</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaFilter className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Filter Lessons</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Privacy Filter */}
          <select
            value={filterPrivacy}
            onChange={(e) => setFilterPrivacy(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Privacy</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* Access Filter */}
          <select
            value={filterAccess}
            onChange={(e) => setFilterAccess(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Access</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>

          {/* Featured Filter */}
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="All">All Status</option>
            <option value="Featured">Featured</option>
            <option value="Not Featured">Not Featured</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Showing {filteredLessons.length} of {allLessons.length} lessons
        </div>
      </motion.div>

      {/* Lessons Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Lesson</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Stats</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson, index) => (
                <motion.tr
                  key={lesson._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover"
                >
                  <td>
                    <div className="flex items-start gap-3">
                      {lesson.image && (
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-base-content line-clamp-2">
                          {lesson.title}
                        </p>
                        <p className="text-sm text-base-content/60 line-clamp-1">
                          {lesson.description}
                        </p>
                        {lesson.isFeatured && (
                          <span className="badge badge-warning badge-xs gap-1 mt-1">
                            <FaStar className="w-2 h-2" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={lesson.authorImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(lesson.authorName || 'User') + '&background=6366f1&color=fff'}
                        alt={lesson.authorName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-base-content/70">
                        {lesson.authorName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <span className="badge badge-primary badge-sm">
                        {lesson.category}
                      </span>
                      <br />
                      <span className="badge badge-secondary badge-sm">
                        {lesson.emotion}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <span className={`badge badge-sm ${lesson.privacy === 'Public' ? 'badge-success' : 'badge-warning'}`}>
                        {lesson.privacy === 'Public' ? (
                          <>
                            <FaGlobe className="w-2 h-2 mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <FaLock className="w-2 h-2 mr-1" />
                            Private
                          </>
                        )}
                      </span>
                      <br />
                      <span className={`badge badge-sm ${lesson.accessLevel === 'Free' ? 'badge-info' : 'badge-error'}`}>
                        {lesson.accessLevel === 'Premium' && <FaCrown className="w-2 h-2 mr-1" />}
                        {lesson.accessLevel}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <FaEye className="w-3 h-3 text-blue-500" />
                        <span>{lesson.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaHeart className="w-3 h-3 text-red-500" />
                        <span>{lesson.likesCount || 0}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/lesson/${lesson._id}`}
                        className="btn btn-xs btn-info"
                      >
                        <FaEye className="w-3 h-3" />
                      </Link>
                      
                      <button
                        onClick={() => handleToggleFeatured(lesson)}
                        disabled={toggleFeaturedMutation.isPending}
                        className={`btn btn-xs ${lesson.isFeatured ? 'btn-warning' : 'btn-success'}`}
                      >
                        <FaStar className="w-3 h-3" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteLesson(lesson)}
                        disabled={deleteLessonMutation.isPending}
                        className="btn btn-xs btn-error"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageLessons;