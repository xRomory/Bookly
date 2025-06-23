import React, { useState } from "react";
import "./HomePage.scss";
import BookingForm from "./BookingForm";
import mainBg from "/resort6.webp"

const HomeHeader = () => {
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow;
  });

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (date > checkOutDate) {
      const newCheckOut = new Date(date);
      newCheckOut.setDate(date.getDate() + 1);
      setCheckOutDate(newCheckOut);
    }
  };

  return (
    <section className="relative h-[700px]">
      <img 
        src={mainBg}
        alt="Mountain background with forest" 
        loading="lazy"
        className="absolute w-full h-full object-cover"
      />

      <div className="inset-0 absolute bg-gradient-to-t from-black/60 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-lora text-zinc-800 text-4xl md:text-5xl mb-4 leading-tight">
              Where Your Journey Begins— <br />
              <strong>Book Your Perfect Stay Today!</strong>
            </h1>
          </div>

          <div className="mt-8 mb-56 md:mb-0 flex items-center justify-center relative">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
