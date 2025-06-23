import React from "react";
import HomeHeader from "./HomeHeader.jsx";
import HomeContent from "./HomeContent.jsx";
import PropertyBrands from "./PropertyBrands.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-main-white">
      <HomeHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <HomeContent />
          <PropertyBrands />
        </div>
      </main>
    </div>
  );
};

export default HomePage;