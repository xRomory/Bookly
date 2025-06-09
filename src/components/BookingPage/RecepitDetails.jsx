import React from "react";

const RecepitDetails = ({ transaction, pricing }) => {
  
  return (
    <div>
      <div className="space-y-2">
        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Reference Number
          </p>
          <p className="font-quicksand font-bold text-main-color">
            {transaction.reference_number}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Card Number:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            {transaction.payment_token}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="font-quicksand font-medium text-main-color">
            Price per day:
          </p>
          <p className="font-quicksand font-medium text-main-color">
            ₱ {pricing.pricePerDay}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-quicksand font-medium text-main-color">
            {pricing.days} day(s)
          </p>
          <p className="font-quicksand font-medium text-main-color">
            ₱ {pricing.pricePerDay * pricing.days}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecepitDetails;
