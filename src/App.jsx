import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import DashboardLayout from "./components/DashboardLayout";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import {
  clearSession,
  getCurrentUser,
  getUsers,
  saveSession,
  saveUsers,
} from "./utils/storage";

function ProtectedLayout({ user, children, onLogoutRequest }) {
  if (!user) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout user={user} onLogoutRequest={onLogoutRequest}>
      {children}
    </DashboardLayout>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [toast, setToast] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();

  const notify = useCallback(
    (message, type = "info") => setToast({ message, type, id: Date.now() }),
    [],
  );
  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (user) {
      const sessionUser = getCurrentUser();
      if (!sessionUser) setUser(null);
      else if (sessionUser !== user) setUser(sessionUser);
    }
  }, []);

  function updateUser(updatedUser) {
    const users = getUsers().map((item) =>
      item.id === updatedUser.id ? updatedUser : item,
    );
    saveUsers(users);
    const session = JSON.parse(
      localStorage.getItem("stacklyauth_session") || "null",
    );
    if (session) saveSession(updatedUser, session.remember);
    setUser(updatedUser);
  }

  function confirmLogout() {
    clearSession();
    setUser(null);
    setLogoutModal(false);
    notify("You have been logged out successfully.", "success");
    navigate("/login");
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={setUser} notify={notify} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register onLogin={setUser} notify={notify} />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword notify={notify} />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword notify={notify} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedLayout
              user={user}
              onLogoutRequest={() => setLogoutModal(true)}
            >
              <Dashboard user={user} />
            </ProtectedLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedLayout
              user={user}
              onLogoutRequest={() => setLogoutModal(true)}
            >
              <Profile user={user} />
            </ProtectedLayout>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedLayout
              user={user}
              onLogoutRequest={() => setLogoutModal(true)}
            >
              <EditProfile user={user} onUpdate={updateUser} notify={notify} />
            </ProtectedLayout>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedLayout
              user={user}
              onLogoutRequest={() => setLogoutModal(true)}
            >
              <ChangePassword
                user={user}
                onUpdate={updateUser}
                notify={notify}
              />
            </ProtectedLayout>
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
      <Toast toast={toast} onClose={closeToast} />
      <Modal
        open={logoutModal}
        title="Log out of StacklyAuth?"
        description="You’ll need to sign in again to access your dashboard and account settings."
        confirmText="Log out"
        danger
        onConfirm={confirmLogout}
        onCancel={() => setLogoutModal(false)}
      />
    </>
  );
}
