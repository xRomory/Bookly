import React from 'react';

const CancellationPolicy = ({ policy }) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-2xl font-quicksand font-bold">Cancellation and Reschedule Policy</h3>
      </div>
      <ul className="space-y-2 ml-1">
        <li className="font-quicksand text-main-color">
          This reservation is {policy.isRefundable ? 'refundable' : 'non-refundable'}
        </li>
        <li className="font-quicksand text-main-color">
          {policy.canReschedule 
            ? 'Can be rescheduled according to availability' 
            : 'Cannot be rescheduled once confirmed'}
        </li>
      </ul>
    </div>
  );
};

export default CancellationPolicy;