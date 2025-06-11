import React from 'react'

const BookingRow = ({ 
  booking,
  isExpanded,
  onRowClick,
  onDelete,
  onViewDetails,
  onCancel
}) => {
  const getStatusIndicator = (status) => {
    switch(status) {
      case 'Paid':
        return (
          <p className="flex items-center text-green-500 font-semibold text-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Paid
          </p>
        );
      case 'Pending':
        return (
          <p className="flex items-center text-yellow-500 font-semibold text-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
            Pending
          </p>
        );
      case 'Cancelled':
        return (
          <p className="flex items-center text-red-500 font-semibold text-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Cancelled
          </p>
        );
      default:
        return (
          <p className="flex items-center text-gray-500 font-semibold text-sm">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
            </span>
            {status || "Unknown"}
          </p>
        );
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <>
      <tr 
        onClick={onRowClick}
        className={`hover:bg-gray-50 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50' : ''}`}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-quicksand font-medium text-gray-900">{booking.userName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-quicksand text-gray-900">{booking.referenceNumber}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-quicksand text-gray-900">{booking.roomName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-quicksand text-gray-900">{formatDate(booking.transactionDate)}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getStatusIndicator(booking.paymentStatus)}
        </td>
      </tr>
      
      {/* Expanded row with action buttons */}
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="5" className="px-6 py-4">
            <div className="flex font-quicksand font-medium justify-end space-x-3">
              {booking.paymentStatus === 'Paid' && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails();
                    }}
                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
                  >
                    View Details
                  </button>
                </>
              )}
              
              {booking.paymentStatus === 'Pending' && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancel();
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
              
              {booking.paymentStatus === 'Cancelled' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default BookingRow