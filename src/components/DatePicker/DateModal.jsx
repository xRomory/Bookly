import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateModal = ({ selectedDate, onChange }) => {

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      minDate={new Date()}
      dateFormat="MMM. dd, yyyy"
    />
  );
};

export default DateModal;