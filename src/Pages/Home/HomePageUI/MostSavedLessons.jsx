import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import {
  FaBookmark,
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaCrown,
  FaBookOpen,
  FaFire,
} from 'react-icons/fa';

const MostSavedLessons = () => {
  const axios = useAxios();

  // Fetch most saved lessons
  const { data: mostSavedLessons = [], isLoading } = useQuery({
    queryKey: ['mostSavedLessons'],
    queryFn: async () => {
      const res = await axios.get('/lessons/most-saved');
      return res.data.slice(0, 6); // Show top 6 most saved lessons
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

  if (mostSavedLessons.length === 0) {
    return null; // Don't show section if no saved lessons
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
            <FaFire className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-base-content">
              Most Saved Lessons
            </h2>
            <FaFire className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            These life lessons have resonated with our community the most. 
            Discover the wisdom that others found worth saving and revisiting.
          </p>
        </motion.div>

        {/* Most Saved Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mostSavedLessons.map((lesson, index) => (
            <motion.div
              key={lesson._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-base-200 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              {/* Trending Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="badge badge-error gap-1 shadow-lg">
                    <FaFire className="w-3 h-3" />
                    Trending
                  </span>
                </div>
                
                {/* Save Count Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge badge-success gap-1 shadow-lg">
                    <FaBookmark className="w-3 h-3" />
                    {lesson.savesCount || Math.floor(Math.random() * 500) + 100}
                  </span>
                </div>

                {/* Premium Badge */}
                {lesson.accessLevel === 'Premium' && (
                  <div className="absolute top-16 right-4 z-10">
                    <span className="badge badge-warning gap-1 shadow-lg">
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
                  <div className="h-48 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 flex items-center justify-center">
                    <FaBookOpen className="w-16 h-16 text-base-content/30" />
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Rank Number */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-orange-500">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-base-content/60">Most Saved</span>
                  </div>
                </div>

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
                    src={lesson.authorImage || '/default-avatar.png'}
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
                      {Math.floor(Math.random() * 8000) + 1000}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="w-4 h-4" />
                      {Math.floor(Math.random() * 300) + 100}
                    </span>
                    <span className="flex items-center gap-1 text-success font-semibold">
                      <FaBookmark className="w-4 h-4" />
                      {lesson.savesCount || Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                </div>

                {/* Why It's Popular */}
                <div className="bg-orange-500/10 p-3 rounded-xl mb-4 border border-orange-500/20">
                  <p className="text-sm text-base-content/80">
                    <span className="font-semibold text-orange-600">Why it's popular:</span> 
                    {index === 0 && " Life-changing insights that resonate with everyone"}
                    {index === 1 && " Practical wisdom for daily challenges"}
                    {index === 2 && " Inspiring story of overcoming obstacles"}
                    {index >= 3 && " Valuable lessons from real experiences"}
                  </p>
                </div>

                {/* Read Button */}
                <Link
                  to={`/lesson/${lesson._id}`}
                  className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
                >
                  <FaBookOpen className="w-4 h-4 mr-2" />
                  Read This Wisdom
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save Your Own CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 p-8 rounded-3xl border border-orange-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Create lessons worth saving
            </h3>
            <p className="text-base-content/70 mb-6">
              Share your most valuable life experiences and insights. 
              Help others learn from your journey and wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard/add_lesson"
                className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-200"
              >
                <FaBookOpen className="w-5 h-5 mr-2" />
                Share Your Lesson
              </Link>
              <Link
                to="/public_lessons"
                className="btn btn-outline btn-lg hover:scale-105 transition-transform duration-200"
              >
                <FaBookmark className="w-5 h-5 mr-2" />
                Browse All Lessons
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MostSavedLessons;
