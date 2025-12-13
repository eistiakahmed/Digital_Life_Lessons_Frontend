import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaLock, FaCrown, FaCalendarAlt, FaEye, FaHeart, FaBookOpen } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const LessonCard = ({ lesson }) => {
  const { user } = useAuth();
  const isPremiumLesson = lesson.accessLevel === 'Premium';
  const canViewPremium =
    user?.isPremium || lesson.authorEmail === user?.email;
  const isBlurred = isPremiumLesson && !canViewPremium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 ${
        isBlurred ? 'relative' : ''
      }`}
    >
      {/* Premium Overlay */}
      {isBlurred && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
          <div className="text-center text-white p-6">
            <FaLock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Lesson</h3>
            <p className="mb-4">Upgrade to view this exclusive content</p>
            <Link to="/pricing" className="btn btn-warning btn-sm">
              <FaCrown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      {/* Lesson Image */}
      {lesson.image && (
        <div className="h-[400px] overflow-hidden">
          <img
            src={lesson.image}
            alt={lesson.title}
            className={`w-full h-full object-cover ${
              isBlurred ? 'blur-sm' : ''
            }`}
          />
        </div>
      )}

      <div className={`p-6 ${isBlurred ? 'blur-sm' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-base-content mb-2 line-clamp-2 h-15">
              {lesson.title}
            </h3>
            <p className="text-base-content/70 text-sm line-clamp-2">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Categories and Emotion */}
        <div className="flex flex-wrap items-center gap-2 h-[50px]">
          <span className="badge badge-primary badge-sm">
            {lesson.category}
          </span>
          <span className="badge badge-secondary badge-sm">
            {lesson.emotion}
          </span>

          {isPremiumLesson && (
            <div className="">
              <span className="badge badge-warning gap-1">
                <FaCrown className="w-3 h-3" />
                Premium
              </span>
            </div>
          )}
        </div>

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
              className="w-10 h-10 rounded-full border border-gray-100 shadow-md hover:ring-2 hover:ring-primary transition-all cursor-pointer"
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

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-base-content/60">
            <span className="flex items-center gap-1">
              <FaEye className="w-4 h-4" />
              {lesson.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="w-4 h-4" />
              {lesson.favorites || 0}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="">
          <Link
            to={isBlurred ? '/pricing' : `/lesson/${lesson._id}`}
            className={`btn w-full ${
              isBlurred ? 'btn-warning' : 'btn-primary'
            }`}
          >
            {isBlurred ? (
              <>
                <FaCrown className="w-4 h-4 mr-2" />
                Upgrade to View
              </>
            ) : (
              <>
                <FaBookOpen className="w-4 h-4 mr-2" />
                Read Lesson
              </>
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;