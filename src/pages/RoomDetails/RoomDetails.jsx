import React, { useState } from "react";
import "./RoomDetails.scss";

import { Link } from "react-router-dom";
import { roomImg } from "../../assets/images/assets.js";
import { IoSparklesOutline } from "react-icons/io5";
import DateModal from "../../components/DatePicker/DateModal.jsx";
import RoomMaps from "./RoomMaps.jsx";

const RoomDetails = () => {
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
    <div className="room-details-container h-full w-full p-16">
      <div className="room-deets-page-container m-16 p-8">
        <div className="header-text-div">
          <h1 className="font-playfair-display font-bold text-5xl mb-8">
            Property Room Name
          </h1>
          <h2 className="font-lora text-2xl mb-8">
            123, Somewhere St., Somewhere
          </h2>
        </div>

        <div className="room-image-div flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={roomImg.room3}
              alt="Room Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 lg:w-1/2 gap-4 w-full">
            <img
              src={roomImg.room2}
              alt="Room Image"
              className="w-full object-cover rounded-xl"
            />
            <img
              src={roomImg.room6}
              alt="Room Image"
              className="w-full object-cover rounded-xl"
            />
            <img
              src={roomImg.room4}
              alt="Room Image"
              className="w-full object-cover rounded-xl"
            />
            <img
              src={roomImg.room5}
              alt="Room Image"
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="room-information flex flex-col md:flex-row md:justify-between mt-10">
          <div className="room-description w-3/4">
            <p className="font-quicksand text-xl md:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
              vestibulum orci. Mauris consectetur euismod nisi vel volutpat.
              Aliquam cursus malesuada mauris et sagittis. Vestibulum interdum
              lobortis nisl, vel bibendum est efficitur eu. Quisque ornare nibh
              dui, quis gravida lorem sollicitudin sit amet.
            </p>
          </div>
          <span className="flex items-center md:flex-col font-quicksand text-5xl font-semibold">
            P20000 /day
          </span>
        </div>

        <form className="availability-form flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl p-6 mx-auto mt-16 max-w-full">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-main-color ">
            <div className="flex flex-col">
              <label
                htmlFor="checkInDate"
                className="font-semibold font-quicksand text-xl"
              >
                Check-in
                <DateModal
                  selectedDate={checkInDate}
                  onChange={handleCheckInChange}
                />
              </label>
            </div>
            <div className="w-px h-16 bg-gray-400/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label
                htmlFor="checkOutDate"
                className="font-semibold font-quicksand text-xl"
              >
                Check-out
                <DateModal selectedDate={checkOutDate} />
              </label>
            </div>
            <div className="w-px h-16 bg-gray-400/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label
                htmlFor="guests"
                className="font-semibold font-quicksand text-xl"
              >
                Guest
                <input
                  type="number"
                  className="max-w-20 flex rounded-lg border-2 border-blue-900 px-3 py-[.3rem] mt-1.5 outline-none"
                  placeholder="0"
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn font-quicksand font-semibold max-w-5xl hover:bg-blue-800 transition-all active:scale-95 text-white text-xl max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 cursor-pointer flex items-center justify-center"
          >
            Check Availability
          </button>
        </form>

        <div className="maps-div mt-24 space-y-4">
          <h2 className="font-quicksand font-bold text-3xl">
            Room Location Map
          </h2>
          <RoomMaps />
          <div className="room-location flex justify-between">
            <h3 className="font-quicksand font-semibold text-2xl">
              Some Country, Country
            </h3>
            <Link to="/maps">
              <button className="btn font-quicksand text-xl font-medium bg-blue-900 w-[400px] text-white rounded-lg">
                See Location
              </button>
            </Link>
          </div>
        </div>

        <div className="room-info-container mt-20 flex gap-6">
          <div className="room-more-details w-3/5 h-[30vw] flex"></div>

          <div className="owner-contact-booking w-2/5 relative">
            <div className="m-8 owner-info-div flex flex-col md:flex-row">
              <div className="owner-icon rounded-full mr-4 w-36 h-36 bg-teal-500"></div>
              <div className="owner-text-info flex flex-col">
                <h3 className="text-2xl font-semibold font-quicksand text-main-color">
                  Juan Dela Cruz
                </h3>
                <span className="text-xl font-medium font-quicksand text-main-color">
                  email@link.com
                </span>
                <span className="text-xl font-medium font-quicksand text-main-color">
                  09123456789
                </span>
              </div>
            </div>

            <Link to="" className="flex justify-center absolute bottom-8 left-52">
              <button className="btn hover:bg-blue-800 text-white font-quicksand font-medium text-xl rounded-lg">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
