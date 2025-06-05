import React from 'react';

const BookingImage = () => {
  return (
    <div className="w-full h-64 overflow-hidden">
      <img 
        src="/assets/images/booking-location.jpg" 
        alt="Property Location" 
        className="w-full h-full object-cover rounded-t-xl"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1546484488-2a1430996887?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV1cm9wZWFuJTIwdG93bnxlbnwwfHwwfHx8MA%3D%3D";
        }}
      />
    </div>
  );
};

export default BookingImage;