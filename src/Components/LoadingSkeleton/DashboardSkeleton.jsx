import React from 'react';
import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-10 bg-base-300 loading-skeleton rounded-lg w-80"></div>
            <div className="h-6 bg-base-300 loading-skeleton rounded-lg w-64"></div>
            <div className="h-8 bg-base-300 loading-skeleton rounded-full w-32"></div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-base-300 loading-skeleton rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="bg-base-100 p-6 rounded-2xl border border-base-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-base-300 loading-skeleton rounded w-20"></div>
                <div className="h-8 bg-base-300 loading-skeleton rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-base-300 loading-skeleton rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-base-300 loading-skeleton rounded"></div>
          <div className="h-6 bg-base-300 loading-skeleton rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-base-100 rounded-2xl border border-base-300">
              <div className="w-12 h-12 bg-base-300 loading-skeleton rounded-xl"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-base-300 loading-skeleton rounded w-32"></div>
                <div className="h-4 bg-base-300 loading-skeleton rounded w-40"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Analytics Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lessons Skeleton */}
        <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-base-300 loading-skeleton rounded"></div>
            <div className="h-6 bg-base-300 loading-skeleton rounded w-32"></div>
          </div>
          
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-base-300 loading-skeleton rounded"></div>
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-32"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-16"></div>
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Analytics Skeleton */}
        <div className="bg-base-100 p-8 rounded-3xl shadow-lg border border-base-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-base-300 loading-skeleton rounded"></div>
            <div className="h-6 bg-base-300 loading-skeleton rounded w-40"></div>
          </div>
          
          <div className="space-y-6">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                <div className="h-4 bg-base-300 loading-skeleton rounded w-24"></div>
                <div className="h-8 bg-base-300 loading-skeleton rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Upgrade Banner Skeleton */}
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-base-300 loading-skeleton rounded"></div>
                <div className="h-5 bg-base-300 loading-skeleton rounded w-40"></div>
              </div>
              <div className="h-4 bg-base-300 loading-skeleton rounded w-full"></div>
              <div className="h-8 bg-base-300 loading-skeleton rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;