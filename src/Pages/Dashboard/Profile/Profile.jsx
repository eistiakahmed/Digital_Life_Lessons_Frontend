import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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
  const { user, updateUserProfile } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
  });

  // Fetch current user data
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's public lessons
  const { data: userLessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['userLessons', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/lessons/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      await updateUserProfile(updatedData.displayName, updatedData.photoURL);
      return axios.put(`/user/${user.email}`, {
        name: updatedData.displayName,
        image: updatedData.photoURL,
      });
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: (error) => {
      toast.error('Failed to update profile');
      console.error(error);
    },
  });

  const handleSaveProfile = () => {
    if (!editForm.displayName.trim()) {
      toast.error('Display name cannot be empty');
      return;
    }
    updateProfileMutation.mutate(editForm);
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    });
    setIsEditing(false);
  };

  if (userLoading) {
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
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Total Views',
      value: userLessons.reduce((sum, lesson) => sum + (lesson.views || 0), 0),
      icon: <FaEye className="w-6 h-6 text-green-500" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Total Likes',
      value: userLessons.reduce((sum, lesson) => sum + (lesson.likes || 0), 0),
      icon: <FaHeart className="w-6 h-6 text-red-500" />,
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-8 rounded-3xl text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user?.photoURL || '/default-avatar.png'}
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
                      disabled={updateProfileMutation.isPending}
                      className="btn btn-success btn-sm"
                    >
                      <FaSave className="w-4 h-4" />
                      {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
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
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
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
                        {lesson.likes || 0}
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