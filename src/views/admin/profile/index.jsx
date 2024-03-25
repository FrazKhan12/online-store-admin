import UpdatePassword from "./components/UpdatePassword";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { showLoader, hideLoader } from "../../../redux/loader";
import toast from "react-hot-toast";
import { updateAdminProfile } from "actions/adminActions";
import { getAllAdminRoles } from "actions/adminActions";
import { ENV } from "config/config";
import { getSingelAdminData } from "actions/adminActions";

const ProfileOverview = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const [profilePicture, setProfilePicture] = useState(null); // State to store the uploaded photo file
  const [roles, setRoles] = useState([]);

  const setImage = (img) => {
    return `${ENV.serverURL}/public/${img}`;
  };

  const handleUpdate = async (data) => {
    const formData = new FormData();

    // Append name field only if it's modified
    if (data.name) {
      formData.append("name", data.name);
    }

    // Append profilePicture only if it's modified
    if (profilePicture !== null) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      dispatch(showLoader());
      const res = await updateAdminProfile(admin?._id, formData);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getAllRoles = async () => {
    try {
      const res = await getAllAdminRoles();
      if (res?.data) {
        setRoles(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const adminInitailValues = {
    name: admin?.name,
    email: admin?.email,
    role: admin?.role?.title,
    password: "",
    profilePicture: admin?.profilePicture,
  };
  console.log("profilePicture", profilePicture);

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      {admin && (
        <Form
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={adminInitailValues}
        >
          <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
            <div className="z-0 col-span-8 lg:!mb-0">
              {/* UPDATE PROFILE */}
              <Card className="grid w-full grid-cols-1 gap-[0px] rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
                <div className="col-span-12 flex h-full w-full  justify-end overflow-hidden rounded-xl bg-white pl-3  dark:!bg-navy-800">
                  <div className="col-span-6 flex h-full w-1/2 flex-col justify-end overflow-hidden rounded-xl bg-white  dark:!bg-navy-800">
                    <Form.Item label="Name" name="name">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-span-6 flex h-full w-1/2 flex-col justify-end overflow-hidden rounded-xl bg-white pl-3  dark:!bg-navy-800">
                    <Form.Item label="Email" name="email">
                      <Input disabled />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-span-12 flex h-full w-full flex-col justify-end overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                  <Form.Item label="Select Role" name="role">
                    <Select
                      disabled
                      onChange={handleChange}
                      options={roles
                        .filter(
                          (role) => role.title.toLowerCase() !== "super admin"
                        )
                        .map((role) => ({
                          label: role.title,
                          value: role._id,
                        }))}
                    />
                  </Form.Item>
                </div>
                <div className="col-span-12 flex h-full w-full flex-col justify-end overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
                  <Form.Item>
                    <Button
                      className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                      type="primary"
                      htmlType="submit"
                    >
                      Update Profile
                    </Button>
                  </Form.Item>
                </div>
              </Card>
            </div>
            <div className="col-span-4 lg:!mb-0">
              <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
                {/* Background and profile */}
                <div
                  className="relative mt-1 flex h-20 w-full justify-center rounded-xl bg-cover"
                  style={{ backgroundImage: `url(${banner})` }}
                >
                  <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                    <img
                      className="h-full w-full rounded-full"
                      src={setImage(admin?.profilePicture)}
                      alt=""
                    />
                  </div>
                </div>

                {/* Name and position */}

                {/* Post followers */}
                <div className="mt-[100px] flex items-center justify-center gap-4 md:!gap-14">
                  <div className="flex  flex-col items-center justify-center outline-none outline-offset-0">
                    {admin?.profilePicture && (
                      <Form.Item
                        name="profilePicture"
                        className="flex w-[150px]  items-center justify-center outline-none outline-offset-0"
                      >
                        <input
                          className="cutomos-css  flex cursor-pointer justify-center  border-none outline-none outline-offset-0"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <span>{profilePicture?.name}</span>
                      </Form.Item>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Form>
      )}
      <div className="grid h-full grid-cols-2 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-1 lg:mb-0 3xl:col-span-12">
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
