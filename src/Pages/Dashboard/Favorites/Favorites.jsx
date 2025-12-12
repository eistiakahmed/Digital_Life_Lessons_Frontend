import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaBookOpen,
  FaFilter,
  FaTrash,
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

const Favorites = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEmotion, setSelectedEmotion] = useState('All');

  // Fetch user's favorites
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['userFavorites', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/favorites/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (lessonId) => {
      return axios.delete(`/favorites/${lessonId}`, {
        data: { userEmail: user.email }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userFavorites', user?.email]);
      toast.success('Removed from favorites');
    },
    onError: () => {
      toast.error('Failed to remove from favorites');
    },
  });

  // Filter favorites
  const filteredFavorites = favorites.filter((favorite) => {
    const matchesCategory = selectedCategory === 'All' || favorite.lesson?.category === selectedCategory;
    const matchesEmotion = selectedEmotion === 'All' || favorite.lesson?.emotion === selectedEmotion;
    return matchesCategory && matchesEmotion;
  });

  const handleRemoveFavorite = (lessonId) => {
    if (window.confirm('Are you sure you want to remove this from favorites?')) {
      removeFavoriteMutation.mutate(lessonId);
    }
  };

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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
          My Favorite Lessons
        </h1>
        <p className="text-base-content/70 text-lg">
          Your saved collection of wisdom and insights
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <FaFilter className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Filter Favorites</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
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
          </div>

          {/* Emotion Filter */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Emotional Tone</span>
            </label>
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
          </div>
        </div>

        <div className="mt-4 text-sm text-base-content/60">
          Showing {filteredFavorites.length} of {favorites.length} favorites
        </div>
      </motion.div>

      {/* Favorites List */}
      {filteredFavorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FaHeart className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-base-content/60 mb-2">
            {favorites.length === 0 ? 'No favorites yet' : 'No favorites match your filters'}
          </h3>
          <p className="text-base-content/50 mb-6">
            {favorites.length === 0 
              ? 'Start exploring lessons and save the ones you love!'
              : 'Try adjusting your filter criteria'
            }
          </p>
          {favorites.length === 0 && (
            <Link to="/public_lessons" className="btn btn-primary">
              <FaBookOpen className="w-4 h-4 mr-2" />
              Browse Lessons
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-base-200 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 font-semibold text-base-content">
              <div className="col-span-4">Lesson</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Saved Date</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-base-300">
            {filteredFavorites.map((favorite, index) => (
              <motion.div
                key={favorite._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-6 py-4 hover:bg-base-200/50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Lesson Info */}
                  <div className="col-span-4">
                    <h3 className="font-bold text-base-content mb-1 line-clamp-1">
                      {favorite.lesson?.title}
                    </h3>
                    <p className="text-sm text-base-content/60 line-clamp-2">
                      {favorite.lesson?.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-base-content/50">
                      <span className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        {Math.floor(Math.random() * 1000)} views
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="w-3 h-3" />
                        {favorite.lesson?.likesCount || 0} likes
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <span className="badge badge-primary badge-sm">
                        {favorite.lesson?.category}
                      </span>
                      <br />
                      <span className="badge badge-secondary badge-sm">
                        {favorite.lesson?.emotion}
                      </span>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={favorite.lesson?.authorImage || '/default-avatar.png'}
                        alt={favorite.lesson?.authorName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-base-content">
                          {favorite.lesson?.authorName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Saved Date */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(favorite.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/lesson/${favorite.lesson?._id}`}
                        className="btn btn-primary btn-xs"
                      >
                        <FaEye className="w-3 h-3" />
                        View
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(favorite.lesson?._id)}
                        disabled={removeFavoriteMutation.isPending}
                        className="btn btn-error btn-xs"
                      >
                        <FaTrash className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500 rounded-full">
              <FaHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {favorites.length}
              </p>
              <p className="text-base-content/60">Total Favorites</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 rounded-full">
              <FaBookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {new Set(favorites.map(f => f.lesson?.category)).size}
              </p>
              <p className="text-base-content/60">Categories</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl border border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <FaUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">
                {new Set(favorites.map(f => f.lesson?.authorEmail)).size}
              </p>
              <p className="text-base-content/60">Authors</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Favorites;