import React from 'react'

const TransactionDetails = ({ customer, pricing }) => {
  return (
    <div>
      <h3 className="text-3xl font-quicksand font-bold mb-3">Transaction Details</h3>
      <div className="space-y-2">
        <div>
          <p className="font-quicksand font-medium text-main-color">Name: {customer.name}</p>
        </div>
        <div>
          <p className="font-quicksand font-medium text-main-color">Email Address: {customer.email}</p>
        </div>
        <div>
          <p className="font-quicksand font-medium text-main-color">Phone Number: {customer.phone}</p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">Check-in:</p>
          <p className="font-quicksand font-medium text-main-color">{customer.checkIn}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">Check-out:</p>
          <p className="font-quicksand font-medium text-main-color">{customer.checkOut}</p>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">Price per day:</p>
          <p className="font-quicksand font-medium text-main-color">₱ {pricing.pricePerDay}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">{pricing.days} day(s):</p>
          <p className="font-quicksand font-medium text-main-color">₱ {pricing.pricePerDay * pricing.days}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;