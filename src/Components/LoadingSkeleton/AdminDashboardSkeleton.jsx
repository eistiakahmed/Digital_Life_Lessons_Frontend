import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboardSkeleton = () => {
  return (
    <div className="space-y-10">
      {/* Header Skeleton */}
      <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
        <div className="space-y-2">
          <div className="h-8 bg-base-300 loading-skeleton rounded w-48"></div>
          <div className="h-5 bg-base-300 loading-skeleton rounded w-64"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-base-300 loading-skeleton rounded w-20"></div>
                <div className="h-8 bg-base-300 loading-skeleton rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-base-300 loading-skeleton rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Growth Chart Skeleton */}
        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-base-300 loading-skeleton rounded"></div>
            <div className="h-6 bg-base-300 loading-skeleton rounded w-32"></div>
          </div>
          
          {/* Chart Area Skeleton */}
          <div className="h-[300px] bg-base-200 loading-skeleton rounded-lg flex items-end justify-between p-4">
            {/* Simulated chart bars */}
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="space-y-2 flex flex-col items-center">
                <div 
                  className="w-8 bg-base-300 loading-skeleton rounded-t"
                  style={{ height: `${Math.random() * 150 + 50}px` }}
                ></div>
                <div className="h-3 w-8 bg-base-300 loading-skeleton rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors Chart Skeleton */}
        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <div className="h-6 bg-base-300 loading-skeleton rounded w-36 mb-4"></div>
          
          {/* Bar Chart Area Skeleton */}
          <div className="h-[300px] bg-base-200 loading-skeleton rounded-lg flex items-end justify-between p-4">
            {/* Simulated horizontal bars */}
            <div className="w-full space-y-4">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-20"></div>
                  <div 
                    className="h-6 bg-base-300 loading-skeleton rounded"
                    style={{ width: `${Math.random() * 200 + 50}px` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Data Tables Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users Table Skeleton */}
        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <div className="h-6 bg-base-300 loading-skeleton rounded w-32 mb-4"></div>
          
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-10 h-10 bg-base-300 loading-skeleton rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-base-300 loading-skeleton rounded w-32"></div>
                  <div className="h-3 bg-base-300 loading-skeleton rounded w-48"></div>
                </div>
                <div className="h-6 w-16 bg-base-300 loading-skeleton rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Skeleton */}
        <div className="rounded-2xl border bg-base-100 p-6 shadow">
          <div className="h-6 bg-base-300 loading-skeleton rounded w-36 mb-4"></div>
          
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                <div className="w-8 h-8 bg-base-300 loading-skeleton rounded-full mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-base-300 loading-skeleton rounded"></div>
                  <div className="h-3 bg-base-300 loading-skeleton rounded w-3/4"></div>
                  <div className="h-3 bg-base-300 loading-skeleton rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;