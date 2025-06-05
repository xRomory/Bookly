import React from "react";

const RoomImages = React.memo(({ mainImage, images }) => (
  <div className="room-image-div flex flex-col lg:flex-row mt-6 gap-6">
    <div className="lg:w-1/2 w-full">
      <img
        
        src={mainImage}
        srcSet={`${mainImage}?w=400 400w, ${mainImage}?w=800 800w`}
        sizes="(max-width: 600px) 400px, 800px"
        alt="Room Image"
        loading="lazy"
        decoding="async"
        width={800}
        height={600}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
    <div className="grid grid-cols-2 lg:w-1/2 gap-4 w-full">
      {images?.slice(0, 4).map((image) => (
        <img
          key={image.id}
          src={image.image}
          alt={`Room view ${image.id}`}
          loading="lazy"
          decoding="async"
          width="300"
          height="200"
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      ))}
    </div>
  </div>
));

export default RoomImages;
