import React, { useState } from "react";
import "./HomePage.scss";

import DateModal from "../../components/DatePicker/DateModal";

import { FaArrowRight } from "react-icons/fa";

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
    <section className="home-header items-center justify-center flex relative h-[38vw] mb-64 p-32">
      <div className="header-container absolute left-[15%] top-[35%]">
        <div className="header-text flex">
          <h1 className="tagline-header w-[55%] ">
            Where Your Journey Begins—
            <strong>Book Your Perfect Stay Today!</strong>
          </h1>
        </div>
      </div>

      <div className="book-card w-[80%] bg-white h-[17vw] absolute bottom-[-8rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg p-4">
        <h3 className="font-bold text-3xl p-[2rem_3rem]">
          Want to book a reservation?
        </h3>
        <div className="card-div grid p-[0rem_2rem] grid-cols-[1fr_2fr]">
          <div className="location-div w-[100%] ml-4">
            <label
              htmlFor="schedule"
              className="location-label flex flex-col font-semibold text-2xl"
            >
              Location
              <input
                type="text"
                className="location-input text-[1rem] w-[85%] p-[0.8rem_1rem] mt-6"
                placeholder="Where do you want to book?"
              />
            </label>
          </div>

          <div className="date-div w-[100%] flex justify-evenly gap-1">
            <label
              htmlFor="schedule"
              className="sched-in-label font-semibold text-2xl"
            >
              Check-in
              <DateModal selectedDate={checkInDate} onChange={handleCheckInChange}/>
            </label>

            <label
              htmlFor="schedule"
              className="sched-out-label font-semibold text-2xl"
            >
              Check-out
              <DateModal selectedDate={checkOutDate} onChange={setCheckOutDate}/>
            </label>
          </div>

          <button className="book-btn flex items-center justify-center gap-4 absolute w-[15%] h-[20%] rounded-lg font-semibold right-24 bottom-0 translate-y-8">
            Book Now!
            <FaArrowRight className="icon text-2xl"/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
