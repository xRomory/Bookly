import { useEffect, useState } from "react";
import BookingRow from "./BookingRow";

import { useTransactions } from "../../context/TransactionContext";
import { useBookings } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

const UserBookingTable = () => {
  const navigate = useNavigate();
  const { fetchAdminBookings, adminBookingAction } = useBookings();
  const { fetchTransactionByBookingId } = useTransactions();
  const [bookings, setBookings] = useState([]);
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchAdminBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        throw error;
      }
    };

    loadBookings();
  }, [fetchAdminBookings]);

  const handleRowClick = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const handleDelete = async (id) => {
    await adminBookingAction(id, "delete");
    setBookings(bookings.filter((b) => b.booking_id !== id));
    setExpandedRowId(null);
  };

  const handleCancel = async (id) => {
    await adminBookingAction(id, "cancel");
    setBookings(
      bookings.map((b) =>
        b.booking_id === id ? { ...b, payment_status: "Cancelled" } : b
      )
    );
  };

  const handleViewDetails = async (bookingId) => {
    try {
      console.log(`Fetching transaction for booking ${bookingId}`); // Debug
      const transaction = await fetchTransactionByBookingId(bookingId);
      console.log("Transaction response:", transaction); // Debug
      // const transaction = await fetchTransactionByBookingId(bookingId);
      if (transaction?.transaction_id) {
        navigate(`/bookings/payment/receipt/${transaction.transaction_id}/`);
      } else {
        alert("No receipt found for this booking.");
      }
    } catch (err) {
      console.error("Failed to fetch receipt:", err);
      alert("Failed to fetch receipt. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-bold font-quicksand text-main-color uppercase tracking-wider">
              User Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold font-quicksand text-main-color uppercase tracking-wider">
              Reference Number
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold font-quicksand text-main-color uppercase tracking-wider">
              Room Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold font-quicksand text-main-color uppercase tracking-wider">
              Transaction Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold font-quicksand text-main-color uppercase tracking-wider">
              Payment Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.booking_id}
              booking={{
                userName: booking.user_name,
                referenceNumber: booking.reference_number,
                roomName: booking.room_name,
                transactionDate: booking.transaction_date,
                paymentStatus: booking.payment_status,
                booking_id: booking.booking_id,
              }}
              isExpanded={expandedRowId === booking.booking_id}
              onRowClick={() => handleRowClick(booking.booking_id)}
              onDelete={() => handleDelete(booking.booking_id)}
              onViewDetails={() => handleViewDetails(booking.booking_id)}
              onCancel={() => handleCancel(booking.booking_id)}
            />
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No booking records found</p>
        </div>
      )}
    </div>
  );
};

export default UserBookingTable;
