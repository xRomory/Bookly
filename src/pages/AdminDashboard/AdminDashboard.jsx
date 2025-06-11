import React, { useState } from "react";
import SideBar from "../../components/AdminComponents/SIdeBar";
import UserBookingTable from "../../components/AdminComponents/UserBookingTable";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-quicksand font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="font-quicksand text-main-color mt-2">
              Monitor the user's booking records—
              <span className="font-semibold text-main-color">view</span>,
              <span className="font-semibold text-main-color"> cancel</span> and
              <span className="font-semibold text-main-color"> delete</span> booking records the
              easier way.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-quicksand font-bold text-gray-800 mb-4">
              User's Bookings
            </h2>
            <UserBookingTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
