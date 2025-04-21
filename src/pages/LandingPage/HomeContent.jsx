import React from "react";
import "./HomePage.scss";

import { BsArrowRightShort } from "react-icons/bs";
import Property from "../../data/property";

const HomeContent = () => {
  const categories = [
    ...new Set(Property.property_brands.map((brand) => brand.category)),
  ].slice(0, 4);

  const hotelName = [
    ...new Set(Property.property_brands.map((name) => name.name)),
  ].slice(0, 4);

  return (
    <section className="content-container w-full h-full p-[1rem_0]">
      <div className="accommodation-type-container m-[3rem_5rem] p-[0_5rem]">
        <div className="header-div">
          <h2 className="header-text font-bold text-5xl mb-8">
            Explore Accommodation Type
          </h2>
          <p className="subtext text-lg">
            Discover Bookly's range of property types for every user's
            preferences
          </p>
        </div>

        <div className="main-content grid grid-cols-4 mt-8 p-8 gap-4">
          {categories.map((category, index) => {
            const matchedBrand = Property.property_brands.find(
              (brand) => brand.category === category
            );

            return (
              <div
                key={index}
                className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]"
              >
                <div className="property-image w-full h-60 relative overflow-hidden">
                  <img
                    src={matchedBrand.image}
                    alt={category}
                    className="category-img"
                  />
                  <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                    <h3>{category}</h3>
                    <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%] cursor-pointer" />
                  </div>
                </div>

                <div className="property-footer p-4 h-[5rem] relative">
                  <div className="footer-text flex justify-center">
                    <h3 className="text-xl font-semibold">{category}</h3>
                    <span className="flex items-start">
                      <span className="logo absolute bottom-4 right-4">
                        Bookly
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="accommodation-type-container m-[3rem_5rem] p-[0_5rem]">
        <div className="header-div">
          <h2 className="header-text font-bold text-5xl mb-8">
            Explore Property Brands
          </h2>
          <p className="subtext text-lg">
            Discover famous property brands that can be found in Metro Manila
          </p>
        </div>

        <div className="main-content grid grid-cols-4 mt-8 p-8 gap-4">
          {hotelName.map((name, index) => {
            const matchedBrand = Property.property_brands.find(
              (brand) => brand.name === name
            );

            return (
              <div
                key={index}
                className="single-property-type overflow-hidden rounded-2xl shadow-[0_2px_8px_2px_rgba(178,178,178,0.4)]"
              >
                <div className="property-image w-full h-60 relative overflow-hidden">
                  <img
                    src={matchedBrand.logo}
                    alt="Sample Image"
                    className="w-[100%] object-cover object-center"
                  />
                  <div className="overlay-info absolute flex items-start flex-col bottom-0 w-full h-0 bg-white overflow-hidden">
                    <h3>{name}</h3>
                    <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%] cursor-pointer" />
                  </div>
                </div>

                <div className="property-footer p-4 h-[5rem] relative">
                  <div className="footer-text flex justify-center">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <span className="flex items-start">
                      <span className="logo absolute bottom-4 right-4">
                        Bookly
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
