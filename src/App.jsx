import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/protectedRoute";
import Layout from "./components/common/layout";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load routes
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));
const TicketDetail = lazy(() => import("./pages/TicketDetail"));
const AdminTicketList = lazy(() => import("./pages/AdminTicketList"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notification"));
const FAQ = lazy(() => import("./pages/FaqPages"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* Add more protected routes here */}
                <Route path="tickets/create" element={<CreateTicket />} />
                <Route path="tickets/:code" element={<TicketDetail />} />{" "}
                {/* Tambahkan ini */}
                <Route
                  path="admin/tickets"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminTicketList />
                    </ProtectedRoute>
                  }
                />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
