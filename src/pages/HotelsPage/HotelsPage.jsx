import React from "react";
import "./HotelsPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Property from "../../data/Property.js";

import { BsArrowRightShort } from "react-icons/bs";

const HotelsPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <section className="section-container flex justify-center items-center h-[55vw]">
        <div className="header-container w-[65%] flex items-center flex-col">
          <h1 className="header-text text-[6.5rem] font-bold text-center mb-4">
            The Stay You Deserve. The Style You Desire
          </h1>
          <p className="tagline text-center text-lg">
            From elegant From elegant escapes to everyday getaways, Bookly
            connects you with curated stays across the city.
          </p>
        </div>
      </section>

      <section className="property-container pt-12 h-[60vw]">
        <div className="content-container">
          <div className="upper-content flex flex-col items-start gap-4 ml-16 pb-8">
            <div className="text-div">
              <h2 className="property-text relative">Property Brands</h2>
            </div>
          </div>

          <div className="main-content grid grid-cols-5 gap-6 m-[3rem_5rem_0]">
            {Property.property_brands.map((name, index) => {
              return (
                <div
                  key={index}
                  className="single-property-brand overflow-hidden h-[15vw] rounded-2xl shadow-[0_5px_16px_rgba(20,_184,_166,_1)]"
                >
                  <div className="brand-image w-full h-[15vw] relative overflow-hidden">
                    <img 
                      src={name.logo} 
                      alt={name.name} 
                      className="bg-white"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="brand-info absolute flex items-start flex-col bottom-0 w-full h-0 overflow-hidden justify-center p-0">
                      <h3 className="font-bold text-white">{name.name}</h3>
                      <BsArrowRightShort className="icon absolute right-5 bottom-5 p-2 rounded-[50%] cursor-pointer" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default HotelsPage;
