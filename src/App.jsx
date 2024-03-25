import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && (
        <div
          style={{ backgroundColor: "black" }}
          className="bg-black absolute z-50 flex h-[100vh] w-[100%] items-center justify-center opacity-50"
          role="status"
        >
          <span class="loader"></span>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </>
  );
};

export default App;
