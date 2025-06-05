import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i + 1 <= currentStep ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <p className={`text-xs mt-1 ${i + 1 <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
              {i === 0 ? 'Transaction Information' : i === 1 ? 'Payment Information' : 'Confirmation'}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <div className={`h-1 flex-1 mx-4 ${currentStep >= 2 ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 mx-4 ${currentStep >= 3 ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;