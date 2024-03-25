import { addAdmin } from "actions/adminActions";
import { getAllAdminRoles } from "actions/adminActions";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate, useParams } from "react-router-dom";
import { getSingelAdminData } from "actions/adminActions";
import { updateAdminProfile } from "actions/adminActions";
import { ENV } from "config/config";

const EditAdminUser = () => {
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // State to store the uploaded photo file
  const [singleAdmin, setSingleAdmin] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState();

  const setImage = (img) => {
    return `${ENV.serverURL}/public/${img}`;
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setRole(value);
  };

  const getAllRoles = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllAdminRoles();
      dispatch(hideLoader());
      if (res?.data) {
        setRoles(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleUpdateAdmin = async (data) => {
    const formData = new FormData();

    // Append name field only if it's modified
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (role) {
      formData.append("role", role);
    }
    // Append profilePicture only if it's modified
    if (profilePicture !== null) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      dispatch(showLoader());
      const res = await updateAdminProfile(id, formData);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/admin/admin-user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const getAdminInfo = async () => {
    try {
      dispatch(showLoader());
      const res = await getSingelAdminData(id);
      dispatch(hideLoader());
      if (res?.data) {
        const adminData = res?.data?.data;
        setSingleAdmin(adminData);
        setStatus(adminData?.status || false);
      }
    } catch (error) {}
  };
  const adminInitailValues = {
    name: singleAdmin?.name,
    email: singleAdmin?.email,
    role: singleAdmin?.role?.title,
    password: "",
    profilePicture: singleAdmin?.profilePicture,
  };

  useEffect(() => {
    getAllRoles();
    getAdminInfo();
  }, []);
  return (
    <div className="mt-[50px]">
      {singleAdmin && (
        <Form
          layout="vertical"
          onFinish={handleUpdateAdmin}
          initialValues={adminInitailValues}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Select Role" name="role">
            <Select
              onChange={handleChange}
              options={roles.map((role) => ({
                label: role.title,
                value: role._id,
              }))}
            />
          </Form.Item>
          {singleAdmin?.profilePicture && (
            <Form.Item label="Profile Picture">
              <input type="file" onChange={handleFileChange} />
              <span>{profilePicture?.name}</span>
            </Form.Item>
          )}
          {singleAdmin?.profilePicture && (
            <img width="150px" src={setImage(singleAdmin?.profilePicture)} />
          )}
          <Form.Item>
            <Radio.Group
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="primary"
              htmlType="submit"
            >
              Update Admin
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditAdminUser;
