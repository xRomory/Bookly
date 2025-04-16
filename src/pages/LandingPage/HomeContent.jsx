import React from "react";
import "./HomePage.scss";
import sampleImg from "../../assets/images/sampleImage.jpg";

import { BsArrowRightShort } from "react-icons/bs";

const HomeContent = () => {
  return (
    <section className="content-container w-full h-full">
      <div className="accommodation-type-container m-[3rem_5rem] p-[0_5rem]">
        <div className="header-div">
          <h2 className="header-text font-bold text-5xl mb-8">Explore Accommodation Type</h2>
          <p className="subtext text-lg">
            Discover Bookly's range of property types for every user's preferences
          </p>
        </div>

        <div className="main-content grid grid-cols-4 mt-8 p-8 gap-4">
          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Hotels</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Hotels</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Apartments</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Apartments</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Motels</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Motels</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Villas</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Villas</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="accommodation-type-container m-[3rem_5rem] p-[0_5rem]">
        <div className="header-div">
          <h2 className="header-text font-bold text-5xl mb-8">Explore Property Brands</h2>
          <p className="subtext text-lg">
            Discover famous property brands that can be found in Metro Manila
          </p>
        </div>

        <div className="main-content grid grid-cols-4 mt-8 p-8 gap-4">
          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Hotel Sagot</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Hotel Sagot</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>MJGC Residences</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">MJGC Residences</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Buroltel</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Buroltel</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>

          <div className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]">
            <div className="property-image w-full h-60 relative overflow-hidden">
              <img src={sampleImg} alt="Sample Image" />
              <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                <h3>Viktor Court</h3>
                <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%]" />
              </div>
            </div>

            <div className="property-footer p-4 h-[5rem] relative">
              <div className="footer-text flex justify-center">
                <h3 className="text-xl font-semibold">Viktor Court</h3>
                <span className="flex items-start">
                  <span className="logo absolute bottom-4 right-4">Bookly</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;