import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory } from "actions/categoryActions";
import { getSingleCategory } from "actions/categoryActions";
import { updateCategory } from "actions/categoryActions";

const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singelCategory, setSingelCategory] = useState();

  const handleUpdateCategory = async (data) => {
    try {
      dispatch(showLoader());
      const res = await updateCategory(id, data);
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

  const initialSingelCategory = {
    categoryName: singelCategory?.categoryName,
  };

  const getSingelCategoryInfo = async () => {
    try {
      const res = await getSingleCategory(id);
      if (res?.data) {
        setSingelCategory(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSingelCategoryInfo();
  }, []);

  return (
    <div className="mt-[50px]">
      {singelCategory && (
        <Form
          layout="vertical"
          onFinish={handleUpdateCategory}
          initialValues={initialSingelCategory}
        >
          <Form.Item label="Category Name" name="categoryName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="primary"
              htmlType="submit"
            >
              Update Category
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditCategory;
