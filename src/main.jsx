import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PropertyProvider } from "./context/PropertyContext.jsx";
import { RoomProvider } from "./context/RoomContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { ListingProvider } from "./context/ListingContext.jsx";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PropertyProvider>
      <RoomProvider>
        <BookingProvider>
          <TransactionProvider>
            <ListingProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ListingProvider>
          </TransactionProvider>
        </BookingProvider>
      </RoomProvider>
    </PropertyProvider>
  </AuthProvider>
);
