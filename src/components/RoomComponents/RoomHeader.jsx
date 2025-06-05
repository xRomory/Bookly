import React from 'react'

const RoomHeader = React.memo(({ name, address }) => (
  <div className="header-text-div">
    <h1 className="font-playfair-display font-bold text-5xl mb-8">
      {name}
    </h1>
    <h2 className="font-lora text-2xl mb-8">
      {address}
    </h2>
  </div>
));

export default RoomHeader