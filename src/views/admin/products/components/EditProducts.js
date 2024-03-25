import { addAdmin } from "actions/adminActions";
import { getAllAdminRoles } from "actions/adminActions";
import { Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "actions/categoryActions";
import { getSingleProductById } from "actions/productActions";
import { ENV } from "config/config";
import { updateSingleProductById } from "actions/productActions";

const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [productPicture, setProductPicture] = useState(null); // State to store the uploaded photo file
  const [singleProduct, setSingleProduct] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const setImage = (img) => {
    return `${ENV.serverURL}/public/${img}`;
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCategory(value);
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

  const handleUpdateProduct = async (data) => {
    console.log("data in edit product", data);
    const formData = new FormData();

    // Append name field only if it's modified
    if (data.productTitle) {
      formData.append("productTitle", data.productTitle);
    }
    if (data.productDescription) {
      formData.append("productDescription", data.productDescription);
    }
    if (data.productPrice) {
      formData.append("productPrice", data.productPrice);
    }
    if (data.stock) {
      formData.append("stock", data.stock);
    }
    if (category) {
      formData.append("categories", category);
    }
    // Append profilePicture only if it's modified
    if (productPicture !== null) {
      formData.append("productImage", productPicture);
    }
    try {
      dispatch(showLoader());

      const res = await updateSingleProductById(id, formData);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductPicture(file);
  };

  const initialProductValue = {
    productTitle: singleProduct?.productTitle,
    productDescription: singleProduct?.productDescription,
    productPrice: singleProduct?.productPrice,
    productImage: singleProduct?.productImage,
    categories: singleProduct?.categories,
    stock: singleProduct?.stock,
  };

  const getSingleProductData = async () => {
    try {
      const res = await getSingleProductById(id);
      if (res?.data) {
        setSingleProduct(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
    getSingleProductData();
  }, []);
  return (
    <div className="mt-[50px]">
      {singleProduct && (
        <Form
          layout="vertical"
          onFinish={handleUpdateProduct}
          initialValues={initialProductValue}
        >
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
          {singleProduct?.productImage && (
            <Form.Item label="Profile Picture">
              <input type="file" onChange={handleFileChange} />
              <span>{productPicture?.name}</span>
            </Form.Item>
          )}
          {singleProduct?.productImage && (
            <img width="150px" src={setImage(singleProduct?.productImage)} />
          )}
          <Form.Item className="mt-4" label="Product Quantity" name="stock">
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button
              className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="primary"
              htmlType="submit"
            >
              Update Product
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
