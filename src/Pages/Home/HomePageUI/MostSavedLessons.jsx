import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import {
  FaBookmark,
  FaCalendarAlt,
  FaCrown,
  FaBookOpen,
  FaFire,
} from 'react-icons/fa';
import Spinner from '../../../Components/Spinner/Spinner';

const MostSavedLessons = () => {
  const axios = useAxios();

  const { data: mostSavedLessons = [], isLoading } = useQuery({
    queryKey: ['mostSavedLessons'],
    queryFn: async () => {
      const res = await axios.get('/lessons/most-saved');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center">
          <div className="">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (mostSavedLessons.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
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
            <h2 className="text-5xl font-bold text-primary">
              Most Saved Lessons
            </h2>
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
                    {lesson.favoritesCount}
                  </span>
                </div>

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
                  <div className="h-48 bg-linear-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 flex items-center justify-center">
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
                    <span className="text-sm text-base-content/60">
                      Most Saved
                    </span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <div className="">
                    <span className="badge badge-primary badge-sm">
                      {lesson.category}
                    </span>
                    <span className="badge badge-secondary badge-sm ml-2">
                      {lesson.emotion}
                    </span>
                  </div>
                  {/* Premium Badge */}
                  <div>
                    {lesson.accessLevel === 'Premium' && (
                      <div className="">
                        <span className="badge badge-warning gap-1 shadow-lg">
                          <FaCrown className="w-3 h-3" />
                          Premium
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2 h-[53px]">
                  {lesson.title}
                </h3>
                <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                  {lesson.description}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Link to={`/profile/${lesson.authorEmail}`}>
                    <img
                      src={
                        lesson.authorImage ||
                        'https://ui-avatars.com/api/?name=' +
                          encodeURIComponent(lesson.authorName || 'User') +
                          '&background=6366f1&color=fff'
                      }
                      alt={lesson.authorName}
                      className="w-8 h-8 rounded-full hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/profile/${lesson.authorEmail}`}
                      className="text-sm font-medium text-base-content hover:text-primary transition-colors"
                    >
                      {lesson.authorName}
                    </Link>
                    <p className="text-xs text-base-content/60 flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
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
          <div className="bg-linear-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 p-8 rounded-3xl border border-orange-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Create lessons worth saving
            </h3>
            <p className="text-base-content/70 mb-6">
              Share your most valuable life experiences and insights. Help
              others learn from your journey and wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard/add-lesson"
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
