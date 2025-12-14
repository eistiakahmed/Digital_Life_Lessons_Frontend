import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaCrown,
  
  FaCalendarAlt,
  FaEnvelope,
  FaImage,
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaShieldAlt,
} from 'react-icons/fa';

const AdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axios = useAxios();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminStats, setAdminStats] = useState({});
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    image: user?.photoURL || '',
  });

  // Fetch admin stats
  const fetchAdminStats = async () => {
    try {
      const [usersRes, lessonsRes, reportsRes] = await Promise.all([
        axios.get('/users'),
        axios.get('/admin/lessons'),
        axios.get('/admin/reported-lessons'),
      ]);
      
      const users = usersRes.data;
      const lessons = lessonsRes.data;
      const reports = reportsRes.data;
      
      setAdminStats({
        totalUsers: users.length,
        premiumUsers: users.filter(u => u.isPremium).length,
        adminUsers: users.filter(u => u.role === 'admin').length,
        totalLessons: lessons.length,
        publicLessons: lessons.filter(l => l.privacy === 'Public').length,
        featuredLessons: lessons.filter(l => l.isFeatured).length,
        totalReports: reports.length,
        pendingReports: reports.filter(r => !r.resolved).length,
      });
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      setAdminStats({});
    }
  };

  // Load admin stats when component mounts
  useEffect(() => {
    fetchAdminStats();
  }, []);

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      name: user?.displayName || '',
      image: user?.photoURL || '',
    });
  }, [user?.displayName, user?.photoURL]);

  // Update profile function
  const updateProfile = async (updateData) => {
    try {
      setIsUpdating(true);
      
      // Update in Firebase Auth
      await updateUserProfile(updateData.name, updateData.image);
      
      // Update in MongoDB
      await axios.put(`/user/${user.email}`, {
        name: updateData.name,
        image: updateData.image,
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    updateProfile(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.displayName || '',
      image: user?.photoURL || '',
    });
    setIsEditing(false);
  };

  const stats = [
    {
      title: 'Total Users',
      value: adminStats.totalUsers || 0,
      icon: <FaUsers className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Premium Users',
      value: adminStats.premiumUsers || 0,
      icon: <FaCrown className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Total Lessons',
      value: adminStats.totalLessons || 0,
      icon: <FaBookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Pending Reports',
      value: adminStats.pendingReports || 0,
      icon: <FaFlag className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          Admin Profile
        </h1>
        <p className="text-base-content/70 text-lg">
          Manage your admin profile and view platform overview
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative inline-block mb-6">
                <img
                  src={
                    isEditing
                      ? formData.image
                      : user?.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.displayName || 'Admin') + '&background=dc2626&color=fff'
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-red-500 to-purple-500 p-3 rounded-full text-white">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-base-content/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-base-content/70 mb-2">
                        Profile Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-base-content">
                      {user?.displayName || 'Admin User'}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <FaEnvelope className="w-4 h-4 text-base-content/60" />
                      <span className="text-base-content/70">
                        {user?.email}
                      </span>
                    </div>
                  </>
                )}

                {/* Admin Badge */}
                <div className="flex justify-center">
                  <span className="badge badge-error gap-2 px-4 py-2">
                    <FaShieldAlt className="w-3 h-3" />
                    Administrator
                  </span>
                </div>

                {/* Join Date */}
                <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>
                    Admin since{' '}
                    {new Date(
                      user?.metadata?.creationTime
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-center pt-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="btn btn-success btn-sm gap-2"
                      >
                        <FaSave className="w-3 h-3" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-ghost btn-sm gap-2"
                      >
                        <FaTimes className="w-3 h-3" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary btn-sm gap-2"
                    >
                      <FaEdit className="w-3 h-3" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats and Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Platform Stats */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaChartLine className="w-6 h-6 text-primary" />
              Platform Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.bgColor} p-6 rounded-2xl border border-base-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-full bg-linear-to-r ${stat.color} text-white`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-base-content mb-1">
                      {stat.value}
                    </p>
                    <p className="text-base-content/60 text-sm font-medium">
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Responsibilities */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaShieldAlt className="w-6 h-6 text-primary" />
              Admin Responsibilities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-base-200 rounded-xl">
                <h4 className="font-bold text-base-content mb-2 flex items-center gap-2">
                  <FaUsers className="w-4 h-4 text-blue-500" />
                  User Management
                </h4>
                <p className="text-sm text-base-content/70">
                  Manage user accounts, promote to admin, handle user-related
                  issues
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-xl">
                <h4 className="font-bold text-base-content mb-2 flex items-center gap-2">
                  <FaBookOpen className="w-4 h-4 text-green-500" />
                  Content Moderation
                </h4>
                <p className="text-sm text-base-content/70">
                  Review lessons, feature quality content, remove inappropriate
                  material
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-xl">
                <h4 className="font-bold text-base-content mb-2 flex items-center gap-2">
                  <FaFlag className="w-4 h-4 text-red-500" />
                  Report Management
                </h4>
                <p className="text-sm text-base-content/70">
                  Handle user reports, investigate issues, take appropriate
                  actions
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-xl">
                <h4 className="font-bold text-base-content mb-2 flex items-center gap-2">
                  <FaChartLine className="w-4 h-4 text-purple-500" />
                  Platform Analytics
                </h4>
                <p className="text-sm text-base-content/70">
                  Monitor platform growth, user engagement, and content quality
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
            <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn btn-primary gap-2">
                <FaUsers className="w-4 h-4" />
                Manage Users
              </button>
              <button className="btn btn-secondary gap-2">
                <FaBookOpen className="w-4 h-4" />
                Review Lessons
              </button>
              <button className="btn btn-warning gap-2">
                <FaFlag className="w-4 h-4" />
                Check Reports
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile;