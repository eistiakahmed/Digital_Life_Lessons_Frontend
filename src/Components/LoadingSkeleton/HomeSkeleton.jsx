import React from 'react';
import { motion } from 'framer-motion';

const HomeSkeleton = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section Skeleton */}
      <div className="h-[70vh] bg-base-300 loading-skeleton rounded-2xl"></div>

      {/* Featured Lessons Skeleton */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-12 bg-base-300 loading-skeleton rounded-lg w-96 mx-auto"></div>
          <div className="h-6 bg-base-300 loading-skeleton rounded-lg w-2/3 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="bg-base-100 rounded-2xl shadow-lg p-6 space-y-4">
              <div className="h-48 bg-base-300 loading-skeleton rounded-xl"></div>
              <div className="space-y-3">
                <div className="h-6 bg-base-300 loading-skeleton rounded"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-base-300 loading-skeleton rounded-full"></div>
                  <div className="h-6 w-16 bg-base-300 loading-skeleton rounded-full"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-base-300 loading-skeleton rounded-full"></div>
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-base-300 loading-skeleton rounded w-24"></div>
                    <div className="h-3 bg-base-300 loading-skeleton rounded w-20"></div>
                  </div>
                </div>
                <div className="h-10 bg-base-300 loading-skeleton rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section Skeleton */}
      <div className="bg-base-100 rounded-3xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="h-10 bg-base-300 loading-skeleton rounded-lg w-80 mx-auto"></div>
          <div className="h-6 bg-base-300 loading-skeleton rounded-lg w-96 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-16 h-16 bg-base-300 loading-skeleton rounded-full mx-auto"></div>
              <div className="h-8 bg-base-300 loading-skeleton rounded w-20 mx-auto"></div>
              <div className="h-4 bg-base-300 loading-skeleton rounded w-24 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-10 bg-base-300 loading-skeleton rounded-lg w-72 mx-auto"></div>
          <div className="h-6 bg-base-300 loading-skeleton rounded-lg w-2/3 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="bg-base-100 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 bg-base-300 loading-skeleton rounded-xl"></div>
              <div className="h-6 bg-base-300 loading-skeleton rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-base-300 loading-skeleton rounded"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-4/5"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-3/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section Skeleton */}
      <div className="bg-base-100 rounded-3xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="h-10 bg-base-300 loading-skeleton rounded-lg w-80 mx-auto"></div>
          <div className="h-6 bg-base-300 loading-skeleton rounded-lg w-96 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="bg-base-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-base-300 loading-skeleton rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-24"></div>
                  <div className="h-3 bg-base-300 loading-skeleton rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-base-300 loading-skeleton rounded"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-5/6"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-4/6"></div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-base-300 loading-skeleton rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;