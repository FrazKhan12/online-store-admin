import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate } from "react-router-dom";
import { createCategory } from "actions/categoryActions";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCategory = async (data) => {
    try {
      dispatch(showLoader());
      const res = await createCategory(data);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/admin/categories");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="mt-[50px]">
      <Form layout="vertical" onFinish={handleAddCategory}>
        <Form.Item label="Category Name" name="categoryName">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="primary"
            htmlType="submit"
          >
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
