import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

import useAxios from '../../../hooks/useAxios';
import {
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaChartLine,
  FaCrown,
  FaEye,
  FaHeart,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const axios = useAxios();

  // Fetch all users
  const { data: allUsers = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axios.get('/users');
      return res.data;
    },
  });

  // Fetch all lessons
  const { data: allLessons = [] } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const res = await axios.get('/admin/lessons');
      return res.data;
    },
  });

  // Fetch reported lessons
  const { data: reportedLessons = [] } = useQuery({
    queryKey: ['reportedLessons'],
    queryFn: async () => {
      const res = await axios.get('/admin/reported-lessons');
      return res.data;
    },
  });

  // Calculate stats
  const totalUsers = allUsers.length;
  const premiumUsers = allUsers.filter((user) => user.isPremium).length;
  const totalPublicLessons = allLessons.filter(
    (lesson) => lesson.privacy === 'Public'
  ).length;
  const totalPrivateLessons = allLessons.filter(
    (lesson) => lesson.privacy === 'Private'
  ).length;
  const totalReports = reportedLessons.length;

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLessons = allLessons.filter(
    (lesson) => new Date(lesson.createdAt) >= today
  ).length;

  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyUsers = allUsers.filter(
    (user) => new Date(user.createdAt) >= oneWeekAgo
  ).length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <FaUsers className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      change: `+${weeklyUsers} this week`,
    },
    {
      title: 'Premium Users',
      value: premiumUsers,
      icon: <FaCrown className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      change: `${Math.round((premiumUsers / totalUsers) * 100)}% conversion`,
    },
    {
      title: 'Public Lessons',
      value: totalPublicLessons,
      icon: <FaBookOpen className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      change: `+${todayLessons} today`,
    },
    {
      title: 'Reported Content',
      value: totalReports,
      icon: <FaFlag className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      change: 'Needs attention',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all registered users',
      icon: <FaUsers className="w-6 h-6" />,
      link: '/dashboard/admin/manage-users',
      color: 'btn-primary',
    },
    {
      title: 'Manage Lessons',
      description: 'Moderate and feature lessons',
      icon: <FaBookOpen className="w-6 h-6" />,
      link: '/dashboard/admin/manage-lessons',
      color: 'btn-secondary',
    },
    {
      title: 'Review Reports',
      description: 'Handle reported content',
      icon: <FaFlag className="w-6 h-6" />,
      link: '/dashboard/admin/reported-lessons',
      color: 'btn-warning',
    },
  ];

  // Recent activity (last 10 lessons)
  const recentLessons = allLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-red-500 via-purple-500 to-blue-500 p-8 rounded-3xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard 👑</h1>
            <p className="text-white/80">
              Platform overview and management controls
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p className="text-white/80">Total Users</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
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
              <p className="text-base-content/60 text-sm font-medium mb-2">
                {stat.title}
              </p>
              <p className="text-xs text-base-content/50">{stat.change}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FaChartLine className="w-6 h-6 text-primary" />
          Admin Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="block p-6 bg-base-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`btn ${action.color} btn-sm`}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-base-content">{action.title}</h3>
              </div>
              <p className="text-base-content/60 text-sm">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Lessons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaBookOpen className="w-6 h-6 text-primary" />
            Recent Lessons
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="flex items-center gap-4 p-4 bg-base-200 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-base-content line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    by {lesson.authorName}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span
                      className={`badge ${
                        lesson.privacy === 'Public'
                          ? 'badge-success'
                          : 'badge-warning'
                      } badge-sm`}
                    >
                      {lesson.privacy}
                    </span>
                    <span
                      className={`badge ${
                        lesson.accessLevel === 'Free'
                          ? 'badge-info'
                          : 'badge-error'
                      } badge-sm`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 text-sm text-base-content/60">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      {lesson.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="w-3 h-3" />
                      {lesson.likesCount || 0}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/50 mt-1">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaChartLine className="w-6 h-6 text-primary" />
            Platform Analytics
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Total Content</span>
              <span className="text-2xl font-bold text-primary">
                {allLessons.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Public vs Private</span>
              <div className="text-right">
                <span className="text-lg font-bold text-success">
                  {totalPublicLessons}
                </span>
                <span className="text-base-content/50"> / </span>
                <span className="text-lg font-bold text-warning">
                  {totalPrivateLessons}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Premium Conversion</span>
              <span className="text-2xl font-bold text-yellow-500">
                {totalUsers > 0
                  ? Math.round((premiumUsers / totalUsers) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Content Moderation</span>
              <span
                className={`text-2xl font-bold ${
                  totalReports > 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {totalReports > 0 ? `${totalReports} Reports` : 'Clean'}
              </span>
            </div>
          </div>

          {totalReports > 0 && (
            <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <h3 className="font-bold text-red-600 mb-2">Action Required</h3>
              <p className="text-sm text-base-content/70 mb-3">
                {totalReports} reported lessons need your attention
              </p>
              <Link
                to="/dashboard/admin/reported_lessons"
                className="btn btn-error btn-sm"
              >
                <FaFlag className="w-4 h-4 mr-2" />
                Review Reports
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
