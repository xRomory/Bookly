import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [error, setError] = useState(null);

  const createTransaction = async (transactionPayload) => {
    try {
      const response = await api.post(
        "/booking/transaction/",
        transactionPayload
      );
      setCurrentTransaction(response.data);
      return response.data;
    } catch (err) {
      console.error("Transaction creation failed:", err);
      setError(err);
      throw err;
    }
  };

  const fetchTransactionDetails = useCallback(async (transactionId) => {
    try {
      const response = await api.get(`/booking/transaction/${transactionId}/`);
      setCurrentTransaction(response.data);
      return response.data;
    } catch (err) {
      console.error("Fetching transaction failed:", err);
      setError(err);
      throw err;
    }
  }, []);

  const fetchTransactionByBookingId = useCallback(async (bookingId) => {
    try {
      const response = await api.get(`/booking/transaction/by-booking/${bookingId}/`);
      return response.data
    } catch (err) {
      console.error("Fetching transaction by booking failed:", err);
      setError(err);
      throw err;
    }
  }, []);

  const value = {
    currentTransaction,
    createTransaction,
    fetchTransactionDetails,
    fetchTransactionByBookingId,
    error,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
