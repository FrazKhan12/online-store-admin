import { addAdmin } from "actions/adminActions";
import { getAllAdminRoles } from "actions/adminActions";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate } from "react-router-dom";
import { createProduct } from "actions/productActions";
import { getCategories } from "actions/categoryActions";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [productPicture, setProductPicture] = useState(null); // State to store the uploaded photo file
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const getAllCategories = async () => {
    try {
      dispatch(showLoader());
      const res = await getCategories();
      dispatch(hideLoader());
      if (res?.data) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  const handleAddProduct = async (data) => {
    const formData = new FormData();
    formData.append("productTitle", data.productTitle);
    formData.append("productDescription", data.productDescription);
    formData.append("productPrice", data.productPrice);
    formData.append("categories", data.categories);
    formData.append("productImage", productPicture);
    formData.append("stock", data.stock);
    try {
      dispatch(showLoader());
      const res = await createProduct(formData);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/admin/products");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error adding admin:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductPicture(file);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="mt-[50px]">
      <Form layout="vertical" onFinish={handleAddProduct}>
        <Form.Item label="Product Name" name="productTitle">
          <Input />
        </Form.Item>
        <Form.Item label="Product Description" name="productDescription">
          <Input />
        </Form.Item>

        <Form.Item label="Product Price" name="productPrice">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Select Category" name="categories">
          <Select
            onChange={handleChange}
            options={categories.map((category) => ({
              label: category.categoryName,
              value: category._id,
            }))}
          />
        </Form.Item>
        <Form.Item label="Product Picture" name="productImage">
          <input type="file" onChange={handleFileChange} />
        </Form.Item>
        <Form.Item label="Product Quantity" name="stock">
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button
            className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            type="primary"
            htmlType="submit"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
