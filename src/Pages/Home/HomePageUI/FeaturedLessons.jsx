import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import {
  FaEye,
  FaHeart,
  FaCalendarAlt,
  FaUser,
  FaCrown,
  FaStar,
  FaBookOpen,
} from 'react-icons/fa';

const FeaturedLessons = () => {
  const axios = useAxios();

  // Fetch featured lessons
  const { data: featuredLessons = [], isLoading } = useQuery({
    queryKey: ['featuredLessons'],
    queryFn: async () => {
      const res = await axios.get('/lessons/featured');
      return res.data.slice(0, 6); // Show only 6 featured lessons
    },
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </section>
    );
  }

  if (featuredLessons.length === 0) {
    return null; // Don't show section if no featured lessons
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaStar className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold text-base-content">
              Featured Life Lessons
            </h2>
            <FaStar className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Discover handpicked wisdom and insights from our community. These lessons have been 
            carefully selected for their impact and value.
          </p>
        </motion.div>

        {/* Featured Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredLessons.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-base-200 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              {/* Featured Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="badge badge-warning gap-1 shadow-lg">
                    <FaStar className="w-3 h-3" />
                    Featured
                  </span>
                </div>
                
                {/* Premium Badge */}
                {lesson.accessLevel === 'Premium' && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="badge badge-error gap-1 shadow-lg">
                      <FaCrown className="w-3 h-3" />
                      Premium
                    </span>
                  </div>
                )}

                {/* Lesson Image */}
                {lesson.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 flex items-center justify-center">
                    <FaBookOpen className="w-16 h-16 text-base-content/30" />
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge badge-primary badge-sm">
                    {lesson.category}
                  </span>
                  <span className="badge badge-secondary badge-sm">
                    {lesson.emotion}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {lesson.description}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={lesson.authorImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(lesson.authorName || 'User') + '&background=6366f1&color=fff'}
                    alt={lesson.authorName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-base-content">
                      {lesson.authorName}
                    </p>
                    <p className="text-xs text-base-content/60 flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-base-content/60">
                    <span className="flex items-center gap-1">
                      <FaEye className="w-4 h-4" />
                      {Math.floor(Math.random() * 5000) + 500}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="w-4 h-4" />
                      {Math.floor(Math.random() * 200) + 50}
                    </span>
                  </div>
                </div>

                {/* Read Button */}
                <Link
                  to={`/lesson/${lesson._id}`}
                  className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
                >
                  <FaBookOpen className="w-4 h-4 mr-2" />
                  Read Lesson
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/public_lessons"
            className="btn btn-outline btn-lg hover:scale-105 transition-transform duration-200"
          >
            <FaBookOpen className="w-5 h-5 mr-2" />
            View All Lessons
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedLessons;