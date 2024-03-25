import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "actions/categoryActions";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "actions/categoryActions";
import { showLoader, hideLoader } from "../../../../redux/loader";
import toast from "react-hot-toast";

const CategoriesTable = () => {
  const { admin } = useSelector((state) => state.admin);
  const currentRole = admin?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();

  const getCategoriesData = async () => {
    try {
      dispatch(showLoader());
      const res = await getCategories();
      dispatch(hideLoader());

      if (res?.data) {
        setCategories(res?.data?.data);
      }
    } catch (error) {}
  };

  const handleDeleteCategory = async (id) => {
    try {
      dispatch(showLoader());
      const res = await deleteCategory(id);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        getCategoriesData();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  const columns = [
    {
      title: "category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },

    {
      title: "category Slug",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (categoryName) => slugify(categoryName).toLowerCase(),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentRole?.editCategory ? (
            <button>
              <Link to={`/admin/categories/edit/${record?._id}`}>
                <FaEdit
                  style={{ color: "green", cursor: "pointer" }}
                  size={24}
                />
              </Link>
            </button>
          ) : (
            <button disabled className="cursor-not-allowed">
              <FaEdit style={{ color: "green" }} size={24} />
            </button>
          )}
          {currentRole?.deleteCategory ? (
            <button>
              <FaTrash
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDeleteCategory(record?._id)}
                size={24}
              />
            </button>
          ) : (
            <button disabled className="cursor-not-allowed">
              <FaTrash style={{ color: "red" }} size={24} />
            </button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Categories Table
        </div>
        <div class="text-md linear mt-2 flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-brand-500 text-center text-base font-bold text-white transition   duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <Link to="/admin/categories/add">Add Category</Link>
        </div>
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <Table columns={columns} dataSource={categories} />
      </div>
    </Card>
  );
};

export default CategoriesTable;
