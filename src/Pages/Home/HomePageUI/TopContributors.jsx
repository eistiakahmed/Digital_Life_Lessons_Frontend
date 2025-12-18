import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import {
  FaTrophy,
  FaBookOpen,
  FaHeart,
  FaEye,
  FaCrown,
  FaMedal,
  FaStar,
} from 'react-icons/fa';
import Spinner from '../../../Components/Spinner/Spinner';

const TopContributors = () => {
  const axios = useAxios();

  const { data: topContributors = [], isLoading } = useQuery({
    queryKey: ['topContributors'],
    queryFn: async () => {
      const res = await axios.get('/users/top-contributors');
      return res.data.slice(0, 6);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-base-200">
        <div className="text-center">
          <div className="">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (topContributors.length === 0) return null;

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <FaTrophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <FaMedal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <FaMedal className="w-6 h-6 text-amber-600" />;
      default:
        return <FaStar className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return 'badge-warning';
      case 1:
        return 'badge-neutral';
      case 2:
        return 'badge-accent';
      default:
        return 'badge-info';
    }
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            
            <h2 className="text-5xl font-bold text-primary">
              Top Contributors This Week
            </h2>
            
          </div>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Celebrating community members sharing the most valuable life
            lessons.
          </p>
        </motion.div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {topContributors.map((contributor, index) => (
            <motion.div
              key={contributor._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-base-100 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 ${
                index === 0
                  ? 'border-yellow-500/50 bg-linear-to-br from-yellow-50/50 to-orange-50/50'
                  : index === 1
                  ? 'border-gray-400/50 bg-linear-to-br from-gray-50/50 to-slate-50/50'
                  : index === 2
                  ? 'border-amber-600/50 bg-linear-to-br from-amber-50/50 to-orange-50/50'
                  : 'border-base-300'
              }`}
            >
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`badge ${getRankBadge(
                      index
                    )} gap-1 shadow-lg text-white font-bold`}
                  >
                    #{index + 1}
                  </span>
                </div>

                {contributor.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="badge badge-warning gap-1 shadow-lg">
                      <FaCrown className="w-3 h-3" /> Premium
                    </span>
                  </div>
                )}

                <div className="pt-12 pb-6 text-center">
                  <div className="relative inline-block">
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      {getRankIcon(index)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-2">
                    {contributor.name}
                  </h3>
                  <p className="text-base-content/60 text-sm">
                    Wisdom Contributor
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <FaBookOpen className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold">
                      {contributor.lessonsCount || 0}
                    </p>
                    <p className="text-xs text-base-content/60">Lessons</p>
                  </div>
                  <div>
                    <FaEye className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold">
                      {contributor.totalViews}
                    </p>
                    <p className="text-xs text-base-content/60">Views</p>
                  </div>
                  <div>
                    <FaHeart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold">
                      {contributor.totalLikes}
                    </p>
                    <p className="text-xs text-base-content/60">Likes</p>
                  </div>
                </div>

                <div className="bg-base-200 p-3 rounded-xl mb-4 text-center">
                  <p className="text-sm text-base-content/70">
                    <span className="font-semibold">Latest:</span> "
                    {contributor.latestLesson?.title ||
                      'Shared valuable insights'}
                    "
                  </p>
                </div>

                <Link
                  to={`/profile/${contributor.email}`}
                  className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-linear-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 p-8 rounded-3xl border border-purple-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-base-content mb-4">
              Want to be featured?
            </h3>
            <p className="text-base-content/70 mb-6">
              Share your life lessons and wisdom with our community.
            </p>
            <Link
              to="/dashboard/add-lesson"
              className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-200"
            >
              <FaBookOpen className="w-5 h-5 mr-2" /> Share Your Wisdom
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopContributors;
