import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAllAdminRoles } from "actions/adminActions";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { deleteSingleRoleById } from "actions/roleActions";

const RolesTable = () => {
  const { admin } = useSelector((state) => state.admin);
  const currentRole = admin?.role;
  console.log("currentRole === ", currentRole);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();

  const getAllRoles = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllAdminRoles();
      dispatch(hideLoader());

      if (res?.data) {
        setRoles(res?.data?.data);
      }
    } catch (error) {
      toast.error(error?.res?.data?.messge);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleDeleteRole = async (roleId) => {
    try {
      dispatch(showLoader());
      const res = await deleteSingleRoleById(roleId);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
        getAllRoles();
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "title",
      key: "title",
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
          {currentRole?.editRole ? (
            !(
              record?._id == currentRole?._id || record?.title === "super admin"
            ) ? (
              <button>
                <Link to={`/admin/roles/edit-role/${record?._id}`}>
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
            )
          ) : (
            <button disabled className="cursor-not-allowed">
              <FaEdit style={{ color: "green" }} size={24} />
            </button>
          )}
          {currentRole?.deleteRole ? (
            !(
              record?._id == currentRole?._id || record?.title === "super admin"
            ) ? (
              <button>
                <FaTrash
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteRole(record?._id)}
                  size={24}
                />
              </button>
            ) : (
              <button disabled className="cursor-not-allowed">
                <FaTrash style={{ color: "red" }} size={24} />
              </button>
            )
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
        {currentRole?.addAdmin && (
          <div class="text-xl font-bold text-navy-700 dark:text-white">
            Roles Table
          </div>
        )}

        <div class="text-md linear mt-2 flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-brand-500 text-center text-base font-bold text-white transition   duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <Link to="/admin/roles/add-role">Create Role</Link>
        </div>
      </div>

      <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <Table columns={columns} dataSource={roles} />
      </div>
    </Card>
  );
};

export default RolesTable;
