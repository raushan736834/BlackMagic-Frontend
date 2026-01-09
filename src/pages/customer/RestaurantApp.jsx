import React, { useState, useEffect } from "react";
import Toast from "../../components/common/Toast.jsx";
import CartPage from "./Cart.jsx"
import LandingPage from "./Landing.jsx"
import MenuPage from "./Menu.jsx";
import OrderHistoryPage from "./OrderHistory.jsx";
import OrderTrackingPage from "./OrderTracking.jsx"
import ProfilePage from "./Profile.jsx";

// App Component
export default function RestaurantApp() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [toast, setToast] = useState(null);
  const [isOnline, setIsOnline] = useState(true);


  // Check online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast("Back online!", "success");
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast("You are offline", "error");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  // Render current page
  return (
    <div className="font-sans">
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "menu" && <MenuPage />}
      {currentPage === "cart" && <CartPage />}
      {currentPage === "payment" && <PaymentPage />}
      {currentPage === "tracking" && <OrderTrackingPage />}
      {currentPage === "history" && <OrderHistoryPage />}
      {currentPage === "profile" && <ProfilePage />}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
