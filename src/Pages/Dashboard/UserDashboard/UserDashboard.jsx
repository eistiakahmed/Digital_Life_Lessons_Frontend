import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import {
  FaBookOpen,
  FaHeart,
  FaEye,
  FaPlus,
  FaCrown,
  FaCalendarAlt,
  FaChartLine,
  
  FaGraduationCap,
} from 'react-icons/fa';
import { LuTrendingUp } from 'react-icons/lu';

const UserDashboard = () => {
  const { user } = useAuth();
  const axios = useAxios();

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
  const { data: favorites = [], isLoading: favoritesLoading } = useQuery({
    queryKey: ['userFavorites', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`/favorites/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate stats
  const totalViews = userLessons.reduce((sum, lesson) => sum + (lesson.views || 0), 0);
  const totalLikes = userLessons.reduce((sum, lesson) => sum + (lesson.likesCount || 0), 0);
  const recentLessons = userLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Get lessons from this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekLessons = userLessons.filter(
    (lesson) => new Date(lesson.createdAt) >= oneWeekAgo
  );

  const stats = [
    {
      title: 'My Lessons',
      value: userLessons.length,
      icon: <FaBookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: <FaEye className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      icon: <FaHeart className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Saved Lessons',
      value: favorites.length,
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Lesson',
      description: 'Share your knowledge with the community',
      icon: <FaPlus className="w-5 h-5 text-white" />,
      link: '/dashboard/add_lesson',
    },
    {
      title: 'My Lessons',
      description: 'Manage and edit your lessons',
      icon: <FaBookOpen className="w-5 h-5 text-white" />,
      link: '/dashboard/my_lessons',
    },
    {
      title: 'Browse Lessons',
      description: 'Discover new knowledge',
      icon: <FaEye className="w-5 h-5 text-white" />,
      link: '/public_lessons',
    },
  ];


  if (userLoading || lessonsLoading || favoritesLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-linear-to-r from-primary via-secondary to-accent p-8 rounded-3xl text-white"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.displayName?.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Ready to inspire and learn today?
              </p>
              {currentUser?.isPremium && (
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    <FaCrown className="w-4 h-4 text-yellow-300" />
                    Premium Member
                  </span>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <img
                src={
                  user?.photoURL ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(user?.displayName || 'User') +
                    '&background=6366f1&color=fff'
                }
                alt={user?.displayName}
                className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>

      {/* Stats Grid */}
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
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-base-content">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.textColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <LuTrendingUp className="w-6 h-6 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group flex items-start gap-4 p-6 bg-base-100 rounded-2xl border border-base-300 hover:shadow-lg transition hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-primary flex items-center justify-center">
                {action.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-semibold text-base-content group-hover:text-primary transition">
                  {action.title}
                </h3>
                <p className="text-sm text-base-content/60 mt-1">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lessons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaBookOpen className="w-6 h-6 text-primary" />
            Recent Lessons
          </h2>
          {recentLessons.length === 0 ? (
            <div className="text-center py-12">
              <FaBookOpen className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/60 mb-4">
                No lessons created yet
              </p>
              <Link
                to="/dashboard/add_lesson"
                className="btn btn-primary rounded-full"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Create Your First Lesson
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="flex items-center gap-4 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-base-content line-clamp-1 mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-base-content/60 flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm text-base-content/60">
                      <span className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        {lesson.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="w-3 h-3" />
                        {lesson.likesCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                to="/dashboard/my_lessons"
                className="block text-center text-primary hover:text-primary-focus font-medium mt-4"
              >
                View All Lessons →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Weekly Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaChartLine className="w-6 h-6 text-primary" />
            This Week's Impact
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <span className="text-base-content/70 font-medium">
                New Lessons
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {thisWeekLessons.length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <span className="text-base-content/70 font-medium">
                Weekly Views
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {thisWeekLessons.reduce(
                  (sum, lesson) => sum + (lesson.views || 0),
                  0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <span className="text-base-content/70 font-medium">
                Engagement Rate
              </span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {userLessons.length > 0
                  ? Math.round((totalLikes / userLessons.length) * 100) / 100
                  : 0}
                %
              </span>
            </div>
          </div>

          {!currentUser?.isPremium && (
            <div className="mt-8 p-6 bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
              <h3 className="font-bold text-base-content mb-2 flex items-center gap-2">
                <FaCrown className="w-5 h-5 text-yellow-500" />
                Unlock Premium Features
              </h3>
              <p className="text-sm text-base-content/70 mb-4">
                Get detailed analytics, unlimited lessons, and priority support!
              </p>
              <Link
                to="/pricing"
                className="btn btn-warning btn-sm rounded-full"
              >
                Upgrade Now
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;