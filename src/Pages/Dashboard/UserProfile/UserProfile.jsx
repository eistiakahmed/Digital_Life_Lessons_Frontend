import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import {
  FaUser,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
  FaCrown,
  FaBookOpen,
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaCamera,
  FaGraduationCap,
  FaTrophy,
  FaChartLine,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Spinner/Spinner';

const UserProfile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  // Fetch current user data
  const { data: currentUser = [] , isLoading: profileLoading } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's lessons
  const { data: userLessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['userLessons', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/lessons/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ['userFavorites', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/favorites/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    });
  }, [user?.displayName, user?.photoURL]);

  const handleSaveProfile = async () => {
    if (!editForm.displayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }

    try {
      setIsUpdating(true);

      await updateUserProfile(editForm.displayName, editForm.photoURL);

      await axios.put(`/user/${user.email}`, {
        displayName: editForm.displayName,
        photoURL: editForm.photoURL,
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);

      queryClient.invalidateQueries(['currentUser', user?.email]);
      queryClient.invalidateQueries(['userLessons', user?.email]);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    });
    setIsEditing(false);
  };

  if (loading || profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalViews = userLessons.reduce((sum, lesson) => sum + (lesson.views || 0), 0);
  const totalLikes = userLessons.reduce((sum, lesson) => sum + (lesson.likesCount || 0), 0);

  const stats = [
    {
      label: 'Lessons Created',
      value: userLessons.length,
      icon: <FaBookOpen className="w-6 h-6" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: <FaEye className="w-6 h-6" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: <FaHeart className="w-6 h-6" />,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      label: 'Saved Lessons',
      value: favorites.length,
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const recentLessons = userLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-linear-to-r from-primary via-secondary to-accent p-8 rounded-3xl text-white shadow-2xl"
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Picture Section */}
            <div className="relative group">
              <div className="relative">
                <img
                  src={
                    user?.photoURL ||
                    'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(user?.displayName || 'User') +
                      '&background=6366f1&color=fff&size=200'
                  }
                  alt={user?.displayName}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                />
                {currentUser?.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 p-3 rounded-full shadow-lg">
                    <FaCrown className="w-5 h-5 text-white" />
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <FaCamera className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 text-center lg:text-left">
              {isEditing ? (
                <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, displayName: e.target.value })
                      }
                      className="input input-bordered w-full text-base-content bg-white"
                      placeholder="Enter your display name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
                    <input
                      type="url"
                      value={editForm.photoURL}
                      onChange={(e) =>
                        setEditForm({ ...editForm, photoURL: e.target.value })
                      }
                      className="input input-bordered w-full text-base-content bg-white"
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="flex gap-3 justify-center lg:justify-start">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="btn btn-success gap-2"
                    >
                      <FaSave className="w-4 h-4" />
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-error gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                    <h1 className="text-4xl font-bold">{user?.displayName}</h1>
                    {currentUser?.isPremium && (
                      <span className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        <FaCrown className="w-4 h-4 text-yellow-300" />
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-lg mb-6 flex items-center gap-2 justify-center lg:justify-start">
                    <FaEnvelope className="w-4 h-4" />
                    {user?.email}
                  </p>
                  <div className="flex gap-3 justify-center lg:justify-start">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline border-white text-white hover:bg-white hover:text-primary gap-2"
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <Link
                      to="/dashboard"
                      className="btn btn-white text-primary gap-2"
                    >
                      <FaChartLine className="w-4 h-4" />
                      View Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} p-6 rounded-2xl border border-base-300 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-base-content">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Achievement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaTrophy className="w-6 h-6 text-yellow-500" />
          Your Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-base-200 rounded-2xl">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-base-content mb-2">Content Creator</h3>
            <p className="text-base-content/60 text-sm">
              {userLessons.length > 0 ? `Created ${userLessons.length} lessons` : 'Create your first lesson'}
            </p>
          </div>
          <div className="text-center p-6 bg-base-200 rounded-2xl">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEye className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-base-content mb-2">Influencer</h3>
            <p className="text-base-content/60 text-sm">
              {totalViews > 0 ? `${totalViews.toLocaleString()} total views` : 'Share your first lesson'}
            </p>
          </div>
          <div className="text-center p-6 bg-base-200 rounded-2xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-bold text-base-content mb-2">Community Favorite</h3>
            <p className="text-base-content/60 text-sm">
              {totalLikes > 0 ? `${totalLikes} likes received` : 'Get your first like'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaBookOpen className="w-6 h-6 text-primary" />
            My Recent Lessons
          </h2>
          <Link
            to="/dashboard/my_lessons"
            className="btn btn-primary btn-sm rounded-full"
          >
            View All
          </Link>
        </div>

        {lessonsLoading ? (
          <div className="flex justify-center py-12">
            <div className="">
              <Spinner />
            </div>
          </div>
        ) : recentLessons.length === 0 ? (
          <div className="text-center py-16">
            <FaBookOpen className="w-20 h-20 text-base-content/20 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-base-content mb-2">No lessons yet</h3>
            <p className="text-base-content/60 mb-6">
              Start sharing your knowledge with the community!
            </p>
            <Link
              to="/dashboard/add_lesson"
              className="btn btn-primary rounded-full gap-2"
            >
              <FaBookOpen className="w-4 h-4" />
              Create Your First Lesson
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLessons.map((lesson) => (
              <motion.div
                key={lesson._id}
                whileHover={{ scale: 1.02 }}
                className="bg-base-200 p-6 rounded-2xl border border-base-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-base-content/60 text-sm line-clamp-3">
                    {lesson.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-base-content/60 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      {lesson.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="w-3 h-3" />
                      {lesson.likesCount || 0}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="badge badge-primary badge-sm">
                    {lesson.category}
                  </span>
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-ghost btn-xs text-primary"
                  >
                    View →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Premium Upgrade Section */}
      {!currentUser?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 p-8 rounded-3xl border border-yellow-500/20"
        >
          <div className="text-center">
            <FaCrown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-base-content mb-2">
              Unlock Premium Features
            </h2>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Get advanced analytics, unlimited lessons, priority support, and exclusive features to enhance your teaching experience.
            </p>
            <Link
              to="/pricing"
              className="btn btn-warning rounded-full gap-2 text-lg px-8"
            >
              <FaCrown className="w-5 h-5" />
              Upgrade to Premium
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;