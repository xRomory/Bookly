import React from 'react'

const OwnerInfo = React.memo(({ property_details, owner }) => (
  <div className="m-8 owner-info-div flex flex-col md:flex-row">
    <div className="owner-icon rounded-full mr-4 w-36 h-36 bg-teal-500 flex items-center justify-center">
      {property_details?.property_logo_url ? (
        <img 
          src={property_details.property_logo_url} 
          className="w-4/5 h-4/5 rounded-full object-cover"
          alt="Owner"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-2xl text-white">
            {property_details?.property_name?.charAt(0)}
          </span>
        </div>
      )}
    </div>
    <div className="owner-text-info flex flex-col">
      <h3 className="text-2xl font-semibold font-quicksand text-main-color">
        {owner?.first_name || property_details?.property_name} {owner?.last_name}
      </h3>
      <span className="text-xl font-medium font-quicksand text-main-color">
        {owner?.email}
      </span>
      <span className="text-xl font-medium font-quicksand text-main-color">
        {owner?.contact_number}
      </span>
    </div>
  </div>
));

export default OwnerInfo