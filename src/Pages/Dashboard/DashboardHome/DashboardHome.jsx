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
} from 'react-icons/fa';
import Spinner from '../../../Components/Spinner/Spinner';

const DashboardHome = () => {
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
  const totalViews = userLessons.reduce(
    (sum, lesson) => sum + (lesson.views || 0),
    0
  );
  const totalLikes = userLessons.reduce(
    (sum, lesson) => sum + (lesson.likesCount || 0),
    0
  );
  const recentLessons = userLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Get lessons from this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekLessons = userLessons.filter(
    (lesson) => new Date(lesson.createdAt) >= oneWeekAgo
  );

  const stats = [
    {
      title: 'Total Lessons',
      value: userLessons.length,
      icon: <FaBookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Views',
      value: totalViews,
      icon: <FaEye className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Likes',
      value: totalLikes,
      icon: <FaHeart className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Saved Lessons',
      value: favorites.length,
      icon: <FaHeart className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Lesson',
      description: 'Share your wisdom with the community',
      icon: <FaPlus className="w-6 h-6" />,
      link: '/dashboard/add-lesson',
      color: 'btn-primary',
    },
    {
      title: 'View My Lessons',
      description: 'Manage your created lessons',
      icon: <FaBookOpen className="w-6 h-6" />,
      link: '/dashboard/my-lessons',
      color: 'btn-secondary',
    },
    {
      title: 'Browse Public Lessons',
      description: 'Discover community wisdom',
      icon: <FaEye className="w-6 h-6" />,
      link: '/public_lessons',
      color: 'btn-accent',
    },
  ];

  if (userLoading || lessonsLoading || favoritesLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div >
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 p-8 rounded-3xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.displayName}! 👋
            </h1>
            <p className="text-white/80">
              Ready to share more wisdom or discover new insights?
            </p>
            {currentUser?.isPremium && (
              <div className="mt-3">
                <span className="badge badge-warning gap-2">
                  <FaCrown className="w-4 h-4" />
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
              className="w-20 h-20 rounded-full border-4 border-white/30"
            />
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/60 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-base-content mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full bg-linear-to-r ${stat.color} text-white`}
              >
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
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          {/* <FaTrendingUp className="w-6 h-6 text-primary" /> */}
          Quick Actions
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
          {recentLessons.length === 0 ? (
            <div className="text-center py-8">
              <FaBookOpen className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/60">No lessons created yet</p>
              <Link
                to="/dashboard/add-lesson"
                className="btn btn-primary btn-sm mt-3"
              >
                Create Your First Lesson
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="flex items-center gap-4 p-4 bg-base-200 rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-base-content line-clamp-1">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-base-content/60 flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaChartLine className="w-6 h-6 text-primary" />
            This Week's Activity
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Lessons Created</span>
              <span className="text-2xl font-bold text-primary">
                {thisWeekLessons.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">
                Total Views This Week
              </span>
              <span className="text-2xl font-bold text-success">
                {thisWeekLessons.reduce(
                  (sum, lesson) => sum + (lesson.views || 0),
                  0
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base-content/70">Engagement Rate</span>
              <span className="text-2xl font-bold text-warning">
                {userLessons.length > 0
                  ? Math.round((totalLikes / userLessons.length) * 100) / 100
                  : 0}
                %
              </span>
            </div>
          </div>

          {!currentUser?.isPremium && (
            <div className="mt-6 p-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
              <h3 className="font-bold text-base-content mb-2">
                Upgrade to Premium
              </h3>
              <p className="text-sm text-base-content/70 mb-3">
                Get advanced analytics, unlimited lessons, and more!
              </p>
              <Link to="/pricing" className="btn btn-warning btn-sm">
                <FaCrown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
