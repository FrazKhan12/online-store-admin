import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createAdminRole } from "actions/roleActions";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../../../redux/loader";
import { getSingleRoleById } from "actions/roleActions";
import { useParams } from "react-router-dom";
import { updateSingleRoleById } from "actions/roleActions";

const EditRole = () => {
  const { admin } = useSelector((state) => state.admin);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const currentRole = admin?.role;
  const [singleRole, setSingleRole] = useState();

  const { id } = useParams();

  const [permissions, setPermissions] = useState({
    // Products Managment
    viewProducts: false,
    editProducts: false,
    deleteProducts: false,

    // Categories Managment
    viewCategory: false,
    editCategory: false,
    deleteCategory: false,

    // Admin Users Managment
    addAdmin: false,
    editAdmin: false,
    deleteAdmin: false,

    // Roles Managment
    editRole: false,
    deleteRole: false,

    // Users Managment
    viewUser: false,
    deleteUser: false,
  });

  const onChangeCheckbox = (name, value) => {
    console.log("Checkbox clicked:", name, value);

    let _permissions = permissions;

    _permissions = { ..._permissions, [name]: value };

    setPermissions(_permissions);
  };

  const handleUpdateRole = async (data) => {
    try {
      const roleData = { data, ...permissions, status };
      dispatch(showLoader());
      const res = await updateSingleRoleById(id, roleData);
      dispatch(hideLoader());
      if (res?.data) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getRoleInfo = async () => {
    try {
      const res = await getSingleRoleById(id);
      if (res?.data) {
        const roleData = res?.data?.data;
        setSingleRole(roleData);
        setPermissions({
          // products permissions
          viewProducts: roleData?.viewProducts || false,
          editProducts: roleData?.editProducts || false,
          deleteProducts: roleData?.deleteProducts || false,

          // categories permissions
          viewCategory: roleData?.viewCategory || false,
          editCategory: roleData?.editCategory || false,
          deleteCategory: roleData?.deleteCategory || false,

          // Admin users permissions
          viewAdmin: roleData?.viewAdmin || false,
          editAdmin: roleData?.editAdmin || false,
          deleteAdmin: roleData?.deleteAdmin || false,

          // Role permissions
          editRole: roleData?.editRole || false,
          deleteRole: roleData?.deleteRole || false,

          // User perimissions
          viewUser: roleData?.viewUser || false,
          deleteUser: roleData?.deleteUser || false,
        });
        setStatus(roleData?.status || false);
      }
    } catch (error) {}
  };
  console.log("singleRole === ", singleRole);

  useEffect(() => {
    getRoleInfo();
  }, []);

  return (
    <>
      <div className="mt-[100px]">
        {singleRole && (
          <Form
            layout="vertical"
            onFinish={handleUpdateRole}
            initialValues={singleRole}
          >
            <Form.Item label="Role Title" name="title">
              <Input />
            </Form.Item>
            {/* Products Permissions */}
            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Products</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Checkbox
                    checked={permissions?.viewProducts}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.viewProducts
                      );
                    }}
                    name="viewProducts"
                  >
                    View
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.editProducts}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.editProducts
                      );
                    }}
                    name="editProducts"
                  >
                    Edit
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.deleteProducts}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.deleteProducts
                      );
                    }}
                    name="deleteProducts"
                  >
                    Delete
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            {/* Categories Permissions */}
            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Categories</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Checkbox
                    checked={permissions?.viewCategory}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.viewCategory
                      );
                    }}
                    name="viewCategory"
                  >
                    View
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.editCategory}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.editCategory
                      );
                    }}
                    name="editCategory"
                  >
                    Edit
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.deleteCategory}
                    onChange={(e) => {
                      onChangeCheckbox(
                        e.target.name,
                        !permissions.deleteCategory
                      );
                    }}
                    name="deleteCategory"
                  >
                    Delete
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            {/* Admins Table Permissions */}
            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Admin Users</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Checkbox
                    checked={permissions?.viewAdmin}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.viewAdmin);
                    }}
                    name="viewAdmin"
                  >
                    View
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.editAdmin}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.editAdmin);
                    }}
                    name="editAdmin"
                  >
                    Edit
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.deleteAdmin}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.deleteAdmin);
                    }}
                    name="deleteAdmin"
                  >
                    Delete
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            {/* Roles Table Permissions */}
            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Roles</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Checkbox
                    checked={permissions?.editRole}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.editRole);
                    }}
                    name="editRole"
                  >
                    Edit
                  </Checkbox>
                  <Checkbox
                    checked={permissions?.deleteRole}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.deleteRole);
                    }}
                    name="deleteRole"
                  >
                    Delete
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            {/* Users Table Permissions */}
            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Users</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Checkbox
                    checked={permissions?.viewUser}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.viewUser);
                    }}
                    name="viewUser"
                  >
                    View
                  </Checkbox>

                  <Checkbox
                    checked={permissions?.deleteUser}
                    onChange={(e) => {
                      onChangeCheckbox(e.target.name, !permissions.deleteUser);
                    }}
                    name="deleteUser"
                  >
                    Delete
                  </Checkbox>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row>
                <Col span={2}>
                  <label>Status</label>
                </Col>
                <Col className="flex gap-5" span={10}>
                  <Radio.Group
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    defaultValue={status}
                  >
                    <Radio value={true}>Active</Radio>
                    <Radio value={false}>Inactive</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                type="primary"
                htmlType="submit"
              >
                Update Role
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  );
};
export default EditRole;
