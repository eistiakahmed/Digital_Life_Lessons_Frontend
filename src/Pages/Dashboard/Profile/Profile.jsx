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
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile, loading } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: userLessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['userLessons', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/lessons/user/${user.email}`);
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
      queryClient.invalidateQueries(['topContributors']);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Lessons Created',
      value: userLessons.length,
      icon: <FaBookOpen className="w-6 h-6 text-blue-500" />,
    },
    {
      label: 'Total Views',
      value: userLessons.reduce((sum, lesson) => sum + (lesson.views || 0), 0),
      icon: <FaEye className="w-6 h-6 text-green-500" />,
    },
    {
      label: 'Total Likes',
      value: userLessons.reduce(
        (sum, lesson) => sum + (lesson.likesCount || 0),
        0
      ),
      icon: <FaHeart className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 p-8 rounded-3xl text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(user?.displayName || 'User') +
                    '&background=6366f1&color=fff'
                }
                alt={user?.displayName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              {currentUser?.isPremium && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 p-2 rounded-full">
                  <FaCrown className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, displayName: e.target.value })
                    }
                    className="input input-bordered w-full max-w-md text-black"
                    placeholder="Display Name"
                  />
                  <input
                    type="url"
                    value={editForm.photoURL}
                    onChange={(e) =>
                      setEditForm({ ...editForm, photoURL: e.target.value })
                    }
                    className="input input-bordered w-full max-w-md text-black"
                    placeholder="Photo URL"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="btn btn-success btn-sm"
                    >
                      <FaSave className="w-4 h-4" />
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-error btn-sm"
                    >
                      <FaTimes className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl font-bold">{user?.displayName}</h1>
                    {currentUser?.isPremium && (
                      <span className="badge badge-warning gap-1">
                        <FaCrown className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 mb-4 flex items-center gap-2 justify-center md:justify-start">
                    <FaEnvelope className="w-4 h-4" />
                    {user?.email}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-purple-500"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full border border-gray-100 shadow-md">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {stat.value}
                  </p>
                  <p className="text-base-content/60">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* User's Public Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaBookOpen className="w-6 h-6 text-primary" />
            My Public Lessons
          </h2>

          {lessonsLoading ? (
            <div className="flex justify-center py-8">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : userLessons.length === 0 ? (
            <div className="text-center py-12">
              <FaBookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/60 text-lg">
                No public lessons created yet
              </p>
              <p className="text-base-content/40">
                Start creating lessons to see them here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userLessons.map((lesson) => (
                <motion.div
                  key={lesson._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-base-200 p-6 rounded-2xl shadow-md border border-base-300 hover:shadow-lg transition-all"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-2">
                      {lesson.title}
                    </h3>
                    <p className="text-base-content/60 text-sm line-clamp-3">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-base-content/60">
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

                  <div className="mt-4">
                    <span className="badge badge-primary badge-sm">
                      {lesson.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
