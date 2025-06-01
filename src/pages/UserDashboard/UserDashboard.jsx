import React, { useState, useEffect } from "react";
import "./UserDashboard.scss";
import SideMenu from "./SideMenu.jsx";
import { FaUserGroup } from "react-icons/fa6";
import { LuMapPinHouse } from "react-icons/lu";
import { roomImg } from "../../assets/images/assets.js";

const UserDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if(userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const username = `${parsedUser.first_name} ${parsedUser.last_name}`;
        const userEmail = `${parsedUser.email}`;
        const contactNumber = `${parsedUser.contact_number}`;
        setName(username);
        setEmail(userEmail);
        setContact(contactNumber);
      } catch(error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <>
      <div className="user-profile-page-container flex h-[62.8rem]">
        <SideMenu />
        <div className="user-content-container flex flex-col">
          <div className="user-profile-container w-[55vw] h-[13vw] flex">
            <div className="user-profile-icon-div flex items-center">
              <div className="icon-circle-bg relative rounded-full w-[175px] h-[175px] bg-teal-400 ml-12"></div>
            </div>
            <div className="user-info-div m-[3rem_2rem]">
              <div className="user-name-text mb-4">
                {name && (
                  <h2 className="user-name-text font-semibold text-3xl">
                    Hello, {name}
                  </h2>
                )}
              </div>
              <div className="user-email-info flex">
                <h3 className="user-email font-bold mr-1">Email:</h3>
                {email &&(
                  <span className="user-email-address font-regular">
                    {email}
                  </span>
                )}
              </div>
              <div className="user-contact-info flex">
                <h3 className="user-email font-bold mr-1">Contact Number:</h3>
                {contact && (
                  <span className="user-email-address font-regular">
                    {contact}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="user-booking-container w-[55vw] h-[33vw]">
            <div className="text-header-info mb-8">
              <h2 className="bookings-header-text font-bold text-3xl">
                My Bookings
              </h2>
            </div>

            <div className="bookings-details-container-div w-[50vw] h-[11vw] p-3 flex gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.25)]">
              <img
                src={roomImg.room1}
                alt="Room image"
                className="h-full w-[265px] rounded-lg object-cover"
              />

              <div className="room-details relative">
                <h3 className="room-name font-bold text-2xl mb-2">Room Type</h3>

                <div className="address-div flex justify-between">
                  <LuMapPinHouse className="icon text-lg" />
                  <p className="">Address ngani</p>
                </div>

                <div className="guest-div flex gap-2">
                  <FaUserGroup className="icon text-lg" />
                  <p className="">Guess: 2</p>
                </div>

                <h3 className="room-price font-bold text-xl mb-2 absolute bottom-1">
                  Total: 20000
                </h3>
              </div>

              <div className="date-details relative top-9 flex gap-6 left-8">
                <div className="address-div flex-col justify-between">
                  <h3 className="font-semibold text-lg">Check-In</h3>
                  <p className="">May 4, 2000</p>
                </div>

                <div className="check-out-div flex-col justify-between">
                  <h3 className="font-semibold text-lg">Check-out</h3>
                  <p className="">September 15, 2000</p>
                </div>
              </div>

              <div className="payment-details relative top-9 flex left-20">
                <div className="status-div justify-between">
                  <p className="flex items-center text-green-500 font-semibold text-lg">
                    <span className={`relative flex h-3 w-3 mr-2`}>
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 bg-green-500`}
                      ></span>
                    </span>
                    Paid
                  </p>
                </div>

                <button className="btn absolute bottom-11 text-white hover:bg-blue-800">
                  Pay Now
                </button>

                <div className="check-out-div flex-col justify-between absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
