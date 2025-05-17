import React from 'react'
import "./UserDashboard.scss";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { BsBuildings } from "react-icons/bs";
import { TbMapSearch } from "react-icons/tb";

const SideMenu = () => {
  return (
    <section className="side-menu-section h-full flex">
      <div className="side-menu-container bg-blue-950 h-full w-[5vw] p-12 ">
        <div className="menu-icons-div flex flex-col justify-center items-center">
          <Link to="/" className=''>
            <IoHomeOutline className='icon' />
          </Link>

          <Link to="/user-profile" className=''>
            <MdOutlinePerson className='icon' />
          </Link>

          <Link to="/rooms" className=''>
            <IoIosBed className='icon' />
          </Link>

          <Link to="/property-brands" className=''>
            <BsBuildings className='icon' />
          </Link>

          <Link to="/maps" className=''>
            <TbMapSearch className='icon' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SideMenu