import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  X,
  ArrowLeft,
  ChefHat,
  Clock,
  CheckCircle,
  Utensils,
  Bell,
  CreditCard,
  Smartphone,
  Wallet,
  DollarSign,
  TrendingUp,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const OrderHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [orderHistory, setOrderHistory] = useState([]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-4 flex items-center gap-4">
        <button onClick={() => setCurrentPage("tracking")}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Order History</h1>
      </div>

      <div className="p-4 space-y-4">
        {orderHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          orderHistory.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{order.orderCode}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-lg font-bold text-orange-500">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {order.items.length} items • Paid via {order.paymentMethod}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default OrderHistoryPage;
