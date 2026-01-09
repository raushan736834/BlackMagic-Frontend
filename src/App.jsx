// App.jsx
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Session Management
import { useSession } from "./hooks/useSession";

// Import your page components
import LandingPage from "./pages/customer/LandingPage";
import MenuPage from "./pages/customer/MenuPage";
import CartPage from "./pages/customer/CartPage";
import PaymentPage from "./pages/customer/PaymentPage";
import OrderTrackingPage from "./pages/customer/OrderTrackingPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import ProfilePage from "./pages/customer/ProfilePage";

// Kitchen Display System
import KitchenDisplay from "./pages/kitchen/KitchenDisplay";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrder";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminTables from "./pages/admin/AdminTable";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminAnalytics from "./pages/admin/AdminAnalytic";
import AdminQrCodeGenerator from "./pages/admin/AdminQrCodeGenerator";
// import AdminSettings from "./pages/admin/AdminSettings";


import NotFoundPage from "./pages/NotFoundPage";
import { AppProvider } from "./contexts/AppProvider";

// ========================
// ROUTE PROTECTION COMPONENTS
// ========================

// Protected Route for Customer Pages (requires active session)
const CustomerProtectedRoute = ({ children }) => {
  const { isSessionActive } = useSession();
  const location = useLocation();

  if (!isSessionActive()) {
    // Redirect to landing page if no active session
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Protected Route for Admin Pages (requires authentication)
const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useSession();
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// Redirect if already authenticated (for login pages)
const PublicOnlyRoute = ({ children, redirectTo }) => {
  const { isAdminAuthenticated } = useSession();

  if (isAdminAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// ========================
// MAIN APP COMPONENT
// ========================
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* ==================== */}
          {/* CUSTOMER ROUTES */}
          {/* ==================== */}

          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Customer Routes */}
          <Route
            path="/menu"
            element={
              <CustomerProtectedRoute>
                <MenuPage />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <CustomerProtectedRoute>
                <CartPage />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <CustomerProtectedRoute>
                <PaymentPage />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/tracking"
            element={
              <CustomerProtectedRoute>
                <OrderTrackingPage />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <CustomerProtectedRoute>
                <OrderHistoryPage />
              </CustomerProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <CustomerProtectedRoute>
                <ProfilePage />
              </CustomerProtectedRoute>
            }
          />

          {/* ==================== */}
          {/* KITCHEN ROUTES */}
          {/* ==================== */}

          <Route path="/kitchen" element={<KitchenDisplay />} />

          {/* ==================== */}
          {/* ADMIN ROUTES */}
          {/* ==================== */}

          {/* Admin Login - Redirect to dashboard if already logged in */}
          <Route
            path="/admin/login"
            element={
              <PublicOnlyRoute redirectTo="/admin/dashboard">
                <AdminLogin />
              </PublicOnlyRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/menu"
            element={
              <AdminProtectedRoute>
                <AdminMenu />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/tables"
            element={
              <AdminProtectedRoute>
                <AdminTables />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/staff"
            element={
              <AdminProtectedRoute>
                <AdminStaff />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <AdminProtectedRoute>
                <AdminAnalytics />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/qr"
            element={
              <AdminProtectedRoute>
                <AdminQrCodeGenerator />
              </AdminProtectedRoute>
            }
          />

          {/* <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettings />
              </AdminProtectedRoute>
            }
          /> */}

          {/* Redirect /admin to /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* ==================== */}
          {/* 404 NOT FOUND */}
          {/* ==================== */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
