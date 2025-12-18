import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

const Spinner = ({ text = 'Digital Life Lessons' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-primary border-b-primary border-gray-200 rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center text-primary text-4xl animate-pulse">
          <FaBookOpen size={12} />
        </div>
      </div>

      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {text}
      </p>
    </div>
  );
};

export default Spinner;
