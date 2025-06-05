import React from 'react'

const RoomDescription = React.memo(({ description, price }) => {
  return (
    <div className="room-information flex flex-col md:flex-row md:justify-between mt-10">
      <div className="room-description w-3/4">
        <p className="font-quicksand text-xl md:text-2xl">
          {description}
        </p>
      </div>
      <span className="flex items-center md:flex-col font-quicksand text-5xl font-semibold">
        {price} /day
      </span>
    </div>
  );
});

export default RoomDescription