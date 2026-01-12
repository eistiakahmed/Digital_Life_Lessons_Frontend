import React from 'react';
import { motion } from 'framer-motion';

const LessonCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden"
    >
      {/* Image Skeleton */}
      <div className="h-[200px] bg-base-300 loading-skeleton"></div>

      <div className="p-6">
        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-base-300 rounded loading-skeleton mb-2"></div>
          <div className="h-4 bg-base-300 rounded loading-skeleton w-3/4"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-base-300 rounded loading-skeleton mb-2"></div>
          <div className="h-4 bg-base-300 rounded loading-skeleton w-2/3"></div>
        </div>

        {/* Badges Skeleton */}
        <div className="flex gap-2 mb-4 h-[50px] items-start">
          <div className="h-6 w-20 bg-base-300 rounded-full loading-skeleton"></div>
          <div className="h-6 w-16 bg-base-300 rounded-full loading-skeleton"></div>
        </div>

        {/* Author Info Skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-base-300 rounded-full loading-skeleton"></div>
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded loading-skeleton mb-1 w-24"></div>
            <div className="h-3 bg-base-300 rounded loading-skeleton w-20"></div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-base-300 rounded-lg loading-skeleton"></div>
      </div>
    </motion.div>
  );
};

export default LessonCardSkeleton;