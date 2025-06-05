import React from 'react'
import { IoSparklesSharp } from "react-icons/io5";

const AmenitiesList = React.memo(({ amenities }) => (
  <ul className="p-0 list-none">
    {amenities?.map((amenity, index) => (
      <li key={index} className="font-quicksand font-semibold flex items-center gap-3 text-[1.5rem] mb-6">
        <IoSparklesSharp className="text-blue-900"/> {amenity}
      </li>
    ))}
  </ul>
));

export default AmenitiesList