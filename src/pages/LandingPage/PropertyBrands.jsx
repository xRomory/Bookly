import React from "react";

const PropertyBrands = () => {
  const brands = [
    {
      id: 1,
      name: "Hotel Sagot",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "MJGC Residences",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 3,
      name: "Buroltel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      name: "Viktor Court",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold font-lora mb-2">Explore Property Brands</h2>
      <p className="text-main-color mb-6 font-quicksand md:text-xl text-lg">Discover famous property brands that can be found in the Philippines</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-secondary-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            <h2 className="px-4 py-3 text-lg font-playfair-display text-blue-900 italic font-bold">Bookly</h2>
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-quicksand font-medium">{brand.name}</h3>
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

export default PropertyBrands;
