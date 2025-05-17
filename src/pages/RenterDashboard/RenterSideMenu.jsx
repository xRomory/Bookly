import React from "react";
import "./RenterDashboard.scss";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const RenterSideMenu = () => {
  return (
    <div className="renter-side-menu h-[53.5vw] mr-16">
      <div className="menu-container h-full w-[23vw]">
        <div className="logo-div flex justify-center">
          <div className="bookly-logo pb-8 m-[2rem_0]">
            <h1 className="logo items-center flex justify-center ">Bookly</h1>
            <p className="subtext text-white">Book with Ease, Stay in Peace</p>
          </div>
        </div>

        <div className="menu-div flex justify-center ">
          <ul>
            <li>
              <Link to="/">
                <IoHomeOutline className="icon" />
                Home
              </Link>
            </li>

            <li>
              <Link to="/renter-dashboard/">
                <MdOutlinePerson className="icon" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/">
                <MdOutlineAddBox className="icon" />
                Add Room
              </Link>
            </li>

            <li>
              <Link to="/renter-dashboard/">
                <MdOutlineFormatListBulleted className="icon" />
                List Room
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenterSideMenu;