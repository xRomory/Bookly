import React from 'react'
import TransactionDetails from '../../components/BookingPage/TransactionDetails';
import RoomInfo from '../../components/BookingPage/RoomInfo';
import OwnerDetails from '../../components/BookingPage/OwnerDetails';
import CancellationPolicy from '../../components/BookingPage/CancellationPolicy';
import ProgressIndicator from '../../components/BookingPage/ProgressIndicator';
import NavigationButtons from '../../components/BookingPage/NavigationButtons';
import BookingImage from '../../components/BookingPage/BookingImage';

import { useRoomDetails } from '../../hooks/useRoomDetails';
import { useNavigate } from 'react-router-dom';
import { useRooms } from '../../context/RoomContext';

const BookingPage = () => {
  // const { room } = useRoomDetails();
  const { rooms } = useRooms();
  const navigate = useNavigate();

  const bookingData = {
    roomType: 'Standard Room',
    address: '123 Address St., Hehe City',
    customer: {
      name: 'Juan Dela Cruz',
      email: 'juandc@email.com',
      phone: '+639123456789',
    },
    pricing: {
      pricePerDay: 1500,
      days: 4,
      total: 6000,
    },
    owner: {
      name: 'Juan Dela Cruz',
      email: 'juandc@email.com',
      phone: '+639123456789',
    },
    policy: {
      isRefundable: false,
      canReschedule: false,
    }
  };

  const handleBack = () => {
    console.log("Going back to previous page");
    navigate(`/rooms/${rooms.room_id}`)
  };

  const handleProceed = () => {
    console.log("Proceeding to payment");
    navigate("/bookings/payment")
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <BookingImage />
            <div className="p-6">
              <RoomInfo roomType={bookingData.roomType} address={bookingData.address} />
              <hr className="my-4 border-gray-600" />
              <TransactionDetails 
                customer={bookingData.customer}
                pricing={bookingData.pricing}
              />
              <hr className="my-4 border-gray-600" />
              <div className="flex justify-between items-center font-bold">
                <h3 className="text-2xl font-quicksand">Total</h3>
                <span className="text-2xl font-quicksand">₱{bookingData.pricing.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <OwnerDetails owner={bookingData.owner} />
            <CancellationPolicy policy={bookingData.policy} />
            <NavigationButtons onBack={handleBack} onProceed={handleProceed} />
            <ProgressIndicator currentStep={1} totalSteps={3} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage