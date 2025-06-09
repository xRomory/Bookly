import React, { useEffect, useState } from 'react'
import { useBookings } from '../../context/BookingContext';
import { useRooms } from '../../context/RoomContext';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionDetails from '../../components/BookingPage/TransactionDetails';
import RoomInfo from '../../components/BookingPage/RoomInfo';
import OwnerDetails from '../../components/BookingPage/OwnerDetails';
import CancellationPolicy from '../../components/BookingPage/CancellationPolicy';
import ProgressIndicator from '../../components/BookingPage/ProgressIndicator';
import NavigationButtons from '../../components/BookingPage/NavigationButtons';
import BookingImage from '../../components/BookingPage/BookingImage';
import LoadingSpinner from '../../components/Utilities/LoadingSpinner';

const BookingPage = () => {
  const { bookingId } = useParams();
  const { currentBooking, fetchBookingDetails } = useBookings();
  const { rooms } = useRooms();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        setLoading(true);
        if (!bookingId) {
          throw new Error("Booking ID is missing from URL");
        }
        await fetchBookingDetails(bookingId);
      } catch (error) {
        console.error("Failed to load booking:", error);
        setError(error.message || "Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };
    loadBookingDetails();
  }, [bookingId, fetchBookingDetails]);

  if(isLoading) return <LoadingSpinner />;
  if (error) return <div className="">{error}</div>;
  if (!currentBooking || !rooms) return <div className='h-screen w-screen flex items-center justify-center font-quicksand font-bold text-5xl'>Booking data not available</div>;

  const checkIn = new Date(currentBooking.booking_check_in);
  const checkOut = new Date(currentBooking.booking_check_out);
  const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  const total = days * currentBooking.room?.price_per_night;

   const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const bookingData = {
    roomType: currentBooking.room?.room_name,
    address: currentBooking.room?.property_details?.address,
    customer: {
      name: `${currentBooking.guest_first_name || currentBooking.user?.first_name} ${currentBooking.guest_last_name || currentBooking.user?.last_name}`,
      email: currentBooking.guest_email,
      phone: currentBooking.guest_contact_number,
      checkIn: formatDate(currentBooking.booking_check_in),
      checkOut: formatDate(currentBooking.booking_check_out),
      guests: currentBooking.guest || 1,
    },
    pricing: {
      pricePerDay: currentBooking.room.price_per_night,
      days,
      total,
    },
    owner: {
      name: `${currentBooking.room.property_details?.user?.first_name || currentBooking.room.property_details?.property_name} ${currentBooking.room.property?.user?.last_name || ""}`,
      email: currentBooking.room.property_details?.user?.email || '',
      phone: currentBooking.room.property_details?.contact_number || '',
      image: currentBooking.room.property_details?.property_logo_url || 
             currentBooking.room.property_details?.user?.profile_picture ||
             null
    },
    policy: {
      isRefundable: false,
      canReschedule: false,
    }
  };

  console.log(bookingData)

  const handleBack = () => {
    console.log("Going back to previous page");
    navigate(`/rooms/${currentBooking.room?.room_id}/`)
  };

  const handleProceed = () => {
    console.log("Proceeding to payment");
    navigate(`/bookings/payment/${currentBooking.booking_id}/`)
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-xl overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <BookingImage 
              roomId={currentBooking.room?.room_id}
            />
            <div className="p-6">
              <RoomInfo 
                roomType={bookingData.roomType} 
                address={bookingData.address} 
              />
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