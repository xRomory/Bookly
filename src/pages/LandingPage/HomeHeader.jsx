import React from "react";
import "./HomePage.scss";

import DateModal from "../../components/DatePicker/DateModal";

import { FaArrowRight } from "react-icons/fa";

const HomeHeader = () => {
  return (
    <section className="home-header items-center justify-center flex relative h-[38vw] m-auto p-32">
      <div className="header-container absolute left-[15%] top-[35%]">
        <div className="header-text flex">
          <h1 className="tagline-header w-[55%] ">
            Where Your Journey Begins—
            <strong>Book Your Perfect Stay Today!</strong>
          </h1>
        </div>
      </div>

      <div className="book-card w-[80%] bg-white h-[19vw] absolute bottom-[-8rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
        <h3 className="font-bold text-3xl p-[2rem]">
          Want to book a reservation?
        </h3>
        <div className="card-div grid p-[0rem_2rem] grid-cols-[1fr_2fr]">
          <div className="location-div w-[100%]">
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
              <DateModal />
            </label>

            <label
              htmlFor="schedule"
              className="sched-out-label font-semibold text-2xl"
            >
              Check-out
              <DateModal />
            </label>
          </div>

          <button className="btn flex items-center justify-center gap-4 absolute w-[15%] h-[20%] rounded-lg font-semibold right-24 bottom-0 translate-y-8">
            Book Now!
            <FaArrowRight className="icon text-2xl"/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
