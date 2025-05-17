import React from "react";
import "./RenterDashboard.scss";
import RenterSideMenu from "./RenterSideMenu";
import { BsBuildingsFill } from "react-icons/bs";
import { LuPhilippinePeso } from "react-icons/lu";

const RentDashboard = () => {
  return (
    <div className="page-main-container h-full w-full flex">
      <RenterSideMenu />

      <div className="renter-dashboard-content w-full h-full pt-12">
        <div className="header-text mb-12">
          <h1 className="font-bold text-4xl mb-2">Owner's Dashboard</h1>
          <p className="header-description text-2xl">
            Monitor your room listings, track bookings and analyze revenue—all
            in one place.
            <br />
            Stay updated with real-time insights to ensure smooth business
            operations.
          </p>
        </div>

        <div className="renters-widget-container flex gap-8 mb-12">
          <div className="total-bookings-div w-[18vw] h-[6vw] rounded-lg flex shadow-[0_0_8px_rgb(0,0,0,0.25)]">
            <BsBuildingsFill className="icon text-[5rem] mr-3" />
            <div className="bookings-div relative">
              <h2 className="text-2xl font-bold">Total Bookings</h2>
              <p className="booked-number absolute bottom-0 text-xl">3</p>
            </div>
          </div>
          <div className="total-revenue-div w-[18vw] h-[6vw] rounded-lg flex shadow-[0_0_8px_rgb(0,0,0,0.25)]">
            <LuPhilippinePeso className="icon text-[5rem] mr-3" />
            <div className="bookings-div relative">
              <h2 className="text-2xl font-bold">Total Revenue</h2>
              <p className="booked-number absolute bottom-0 text-xl">3</p>
            </div>
          </div>
        </div>

        <div className="booking-list-container">
          <h2 className="bookings-header text-4xl font-[Quicksand] font-bold mb-6">Bookings</h2>
          <div className="label-table-div bg-[#e7e7e7] w-[47vw] h-[4.5vw] flex justify-between items-center p-6 shadow-[0_4px_8px_rgb(0,0,0,0.25)]">
            <h3 className="username">User Name</h3>
            <h3 className="room-name">Room Name</h3>
            <h3 className="total-amount">Total Amount</h3>
            <h3 className="status">Payment Status</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDashboard;
