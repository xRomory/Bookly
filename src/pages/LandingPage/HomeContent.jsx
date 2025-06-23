import React from "react";
import "./HomePage.scss";

const HomeContent = () => {

  const accommodations = [
    {
      id: 1,
      title: 'Hotels',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: 'Apartments',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      title: 'Motels',
      image: 'https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 4,
      title: 'Villas',
      image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    }
  ];

  return (
    <section className="my-20">
      <h2 className="text-3xl md:text-4xl font-bold font-lora mb-2">Explore Accommodation Type</h2>
      <p className="text-main-color mb-6 font-quicksand md:text-xl text-lg">Discover Bookly's range of property types for every user's preferences</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {accommodations.map((accommodation) => (
          <div key={accommodation.id} className="bg-secondary-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={accommodation.image} 
                alt={accommodation.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <h2 className="px-4 py-3 text-lg font-playfair-display text-blue-900 italic font-bold">Bookly</h2>
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-quicksand font-medium">{accommodation.title}</h3>
              <button className="text-blue-900 hover:text-blue-800 font-quicksand font-semibold">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeContent;
