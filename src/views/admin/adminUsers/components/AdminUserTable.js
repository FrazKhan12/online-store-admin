import Card from "components/card";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { Space, Table, Tag } from "antd";
import { getAllAdmins } from "actions/adminActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { Link, useNavigate } from "react-router-dom";
import { deleteAdminById } from "actions/adminActions";
import toast from "react-hot-toast";

const AdminUserTable = () => {
  const { admin } = useSelector((state) => state.admin);
  const currentRole = admin?.role;
  const [admins, setAdmins] = useState([]);
  const dispatch = useDispatch();
  const getAdmins = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllAdmins();
      dispatch(hideLoader());
      if (res?.data) {
        setAdmins(res?.data?.data);
      }
    } catch (error) {}
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      dispatch(showLoader());
      const res = await deleteAdminById(adminId);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
        getAdmins();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAdmins();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role && role.title, // Check if role exists before accessing title
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentRole?.editAdmin ? (
            !(
              record?.name === admin?.name ||
              record?.role?.title === "super admin"
            ) ? (
              <button>
                <Link to={`/admin/admin-user/edit/${record?._id}`}>
                  <FaEdit
                    style={{ color: "green", cursor: "pointer" }}
                    size={24}
                  />
                </Link>
              </button>
            ) : (
              <button disabled className="cursor-not-allowed	">
                <FaEdit style={{ color: "green" }} size={24} />
              </button>
            )
          ) : (
            <button disabled className="cursor-not-allowed	">
              <FaEdit style={{ color: "green" }} size={24} />
            </button>
          )}

          {currentRole?.deleteAdmin ? (
            !(
              record?.name === admin?._id ||
              record?.role?.title === "super admin"
            ) ? (
              <button>
                <FaTrash
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteAdmin(record?._id)}
                  size={24}
                />
              </button>
            ) : (
              <button disabled className="cursor-not-allowed	">
                <FaTrash style={{ color: "red" }} size={24} />
              </button>
            )
          ) : (
            <button disabled className="cursor-not-allowed	">
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
          Admin Users
        </div>
        <div class="text-md linear mt-2 flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-brand-500 text-center text-base font-bold text-white transition   duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <Link to="/admin/admin-user/add">Add Admin</Link>
        </div>
      </div>
      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <Table columns={columns} dataSource={admins} />
      </div>
    </Card>
  );
};

export default AdminUserTable;
