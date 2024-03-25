import { addAdmin } from "actions/adminActions";
import { getAllAdminRoles } from "actions/adminActions";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate } from "react-router-dom";

const AddAdminUser = () => {
  const [roles, setRoles] = useState([]);
  const [status, setStatus] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // State to store the uploaded photo file
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
  const handleAddAdmin = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("profilePicture", profilePicture);
    formData.append("status", status);
    try {
      dispatch(showLoader());
      const res = await addAdmin(formData);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/admin/admin-user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error adding admin:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  useEffect(() => {
    getAllRoles();
  }, []);
  return (
    <div className="mt-[50px]">
      <Form layout="vertical" onFinish={handleAddAdmin}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input />
        </Form.Item>
        <Form.Item label="Select Role" name="role">
          <Select
            onChange={handleChange}
            options={roles
              .filter((role) => role.title !== "super admin")
              .map((role) => ({
                label: role.title,
                value: role._id,
              }))}
          />
        </Form.Item>
        <Form.Item label="Profile Picture" name="profilePicture">
          <input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Form.Item>
          <Radio.Group onChange={(e) => setStatus(e.target.value)}>
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
            Add Admin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAdminUser;
