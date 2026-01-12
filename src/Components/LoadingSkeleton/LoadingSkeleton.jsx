import React from 'react';

const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  className = '',
  height = 'auto' 
}) => {
  const renderCardSkeleton = () => (
    <div className={`bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden animate-pulse ${className}`}>
      {/* Image skeleton */}
      <div className="h-[200px] bg-base-300"></div>
      
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
        </div>
        
        {/* Badges skeleton */}
        <div className="flex gap-2">
          <div className="h-6 bg-base-300 rounded-full w-20"></div>
          <div className="h-6 bg-base-300 rounded-full w-16"></div>
        </div>
        
        {/* Author skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-base-300 rounded-full"></div>
          <div className="space-y-1 flex-1">
            <div className="h-4 bg-base-300 rounded w-24"></div>
            <div className="h-3 bg-base-300 rounded w-20"></div>
          </div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-base-300 rounded w-full"></div>
      </div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className={`animate-pulse space-y-2 ${className}`}>
      <div className="h-4 bg-base-300 rounded w-full"></div>
      <div className="h-4 bg-base-300 rounded w-5/6"></div>
      <div className="h-4 bg-base-300 rounded w-4/6"></div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div className={`bg-base-100 rounded-xl shadow-lg overflow-hidden animate-pulse ${className}`}>
      {/* Table header */}
      <div className="bg-base-200 p-4 border-b border-base-300">
        <div className="flex gap-4">
          <div className="h-4 bg-base-300 rounded w-24"></div>
          <div className="h-4 bg-base-300 rounded w-32"></div>
          <div className="h-4 bg-base-300 rounded w-20"></div>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </div>
      </div>
      
      {/* Table rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-4 border-b border-base-300 last:border-b-0">
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 bg-base-300 rounded-full"></div>
            <div className="h-4 bg-base-300 rounded w-32"></div>
            <div className="h-4 bg-base-300 rounded w-20"></div>
            <div className="h-6 bg-base-300 rounded-full w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className={`bg-base-100 rounded-xl shadow-lg p-6 animate-pulse space-y-6 ${className}`}>
      {/* Form title */}
      <div className="h-8 bg-base-300 rounded w-48"></div>
      
      {/* Form fields */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-24"></div>
          <div className="h-12 bg-base-300 rounded w-full"></div>
        </div>
      ))}
      
      {/* Submit button */}
      <div className="h-12 bg-base-300 rounded w-32"></div>
    </div>
  );

  const renderCustomSkeleton = () => (
    <div className={`bg-base-300 rounded animate-pulse ${className}`} style={{ height }}>
    </div>
  );

  const skeletonTypes = {
    card: renderCardSkeleton,
    text: renderTextSkeleton,
    table: renderTableSkeleton,
    form: renderFormSkeleton,
    custom: renderCustomSkeleton,
  };

  const SkeletonComponent = skeletonTypes[type] || renderCardSkeleton;

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <SkeletonComponent />
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;