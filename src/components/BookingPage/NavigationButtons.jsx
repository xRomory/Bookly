import React from 'react';

const NavigationButtons = ({ onBack, onProceed }) => {
  return (
    <div className="flex gap-4">
      <button 
        onClick={onBack}
        className="flex-1 px-4 py-3 bg-teal-500 hover:bg-teal-400 font-quicksand text-white rounded-md transition-colors font-semibold"
      >
        Back
      </button>
      <button 
        onClick={onProceed}
        className="flex-1 px-4 py-3 bg-navy-700 bg-blue-900 hover:bg-blue-800 font-quicksand text-white rounded-md transition-colors font-semibold"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default NavigationButtons;