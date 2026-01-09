import React from 'react';

// Basic Skeleton Component
export const Skeleton = ({ className = '', width, height }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded ${className}`}
    style={{ width, height }}
  />
);

// Skeleton Card for Menu Items
export const SkeletonMenuCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-300"></div>
    <div className="p-3 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// Skeleton for Order Card
export const SkeletonOrderCard = () => (
  <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-16"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
    <div className="h-10 bg-gray-300 rounded"></div>
  </div>
);

// Skeleton for Table Row
export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className="animate-pulse">
    {Array(columns).fill(0).map((_, idx) => (
      <td key={idx} className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
    ))}
  </tr>
);

// Skeleton for Stats Card
export const SkeletonStatsCard = () => (
  <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
);

// Skeleton for List
export const SkeletonList = ({ items = 5, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array(items).fill(0).map((_, idx) => (
      <div key={idx} className="bg-white rounded-lg p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    ))}
  </div>
);

export default {
  Skeleton,
  SkeletonMenuCard,
  SkeletonOrderCard,
  SkeletonTableRow,
  SkeletonStatsCard,
  SkeletonList
};
