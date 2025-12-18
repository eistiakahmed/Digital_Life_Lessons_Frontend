import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxios from '../../hooks/useAxios';
import {
  FaUser,
  FaEnvelope,
  FaCrown,
  FaBookOpen,
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import { Link } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner';

const PublicProfile = () => {
  const { email } = useParams();
  const axios = useAxios();

  // Fetch user profile data  
  const { data: profileUser, isLoading: userLoading } = useQuery({
    queryKey: ['publicProfile', email],
    queryFn: async () => {
      const res = await axios.get(`/user/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // console.log(profileUser?.photoURL)

  // Fetch user's public lessons
  const { data: userLessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['publicUserLessons', email],
    queryFn: async () => {
      const res = await axios.get(`/lessons/user/${email}`);
      
      return res.data.filter(lesson => lesson.privacy === 'Public');
    },
    enabled: !!email,
  });

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-base-content mb-4">User Not Found</h1>
          <p className="text-base-content/60 mb-6">The profile you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Public Lessons',
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
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="btn btn-ghost gap-2 mb-4">
            <FaArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Profile Header */}
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
                  profileUser?.photoURL ||
                  profileUser?.image ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(profileUser.displayName || 'User') +
                    '&background=6366f1&color=fff'
                }
                alt={profileUser?.name || profileUser.displayName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              {profileUser.isPremium && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 p-2 rounded-full">
                  <FaCrown className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold">
                  {profileUser?.name || profileUser.displayName}
                </h1>
                {profileUser.isPremium && (
                  <span className="badge badge-warning gap-1">
                    <FaCrown className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-white/80 mb-4 flex items-center gap-2 justify-center md:justify-start">
                <FaEnvelope className="w-4 h-4" />
                {profileUser.email}
              </p>
              <p className="text-white/90">
                Sharing wisdom and life experiences with the community
              </p>
            </div>
          </div>
        </motion.div>

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
            Public Lessons by {profileUser.displayName}
          </h2>

          {lessonsLoading ? (
            <div className="flex justify-center py-8">
              <div className="">
                <Spinner />
              </div>
            </div>
          ) : userLessons.length === 0 ? (
            <div className="text-center py-12">
              <FaBookOpen className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/60 text-lg">
                No public lessons shared yet
              </p>
              <p className="text-base-content/40">
                This user hasn't shared any public lessons with the community.
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

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-primary badge-sm">
                      {lesson.category}
                    </span>
                    <span className="badge badge-secondary badge-sm">
                      {lesson.emotion}
                    </span>
                    {lesson.accessLevel === 'Premium' && (
                      <span className="badge badge-warning badge-sm gap-1">
                        <FaCrown className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-base-content/60 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        { Math.floor(Math.random() * 1000)}
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

                  {/* Read Lesson Button */}
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    <FaBookOpen className="w-4 h-4 mr-2" />
                    Read Lesson
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;