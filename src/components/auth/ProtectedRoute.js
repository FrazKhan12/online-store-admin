import { getAdminDataByID } from "actions/adminActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../../redux/loader";
import { setAdminData } from "../../redux/adminSlice";
import toast from "react-hot-toast";
import { ENV } from "config/config";

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoader());
      const res = await getAdminDataByID();
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        dispatch(setAdminData(res?.data?.data));
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      localStorage.clear();
    }
  };

  useEffect(() => {
    if (!admin) {
      getUserData();
    }
  }, []);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/auth/sign-in" />;
  }
};

export default ProtectedRoute;
