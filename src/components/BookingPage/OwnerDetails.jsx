import React from 'react';

const OwnerDetails = ({ owner }) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-blue-200 overflow-hidden flex-shrink-0">
          <img 
            src="/assets/images/owner-avatar.jpg" 
            alt={owner.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234299e1'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='35' fill='white' text-anchor='middle' dominant-baseline='middle'%3E👤%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-quicksand font-bold mb-2">Owner's Details</h3>
          <div className="space-y-1">
            <p className="font-quicksand text-gray-700">Name: {owner.name}</p>
            <p className="font-quicksand text-gray-700">Email Address: {owner.email}</p>
            <p className="font-quicksand text-gray-700">Phone Number: {owner.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;