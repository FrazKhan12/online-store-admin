import React, { useState } from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { updateAdminProfile } from "actions/adminActions";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../../../redux/loader";

const Banner = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const [profilePicture, setProfilePicture] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  const handleUpdate = async (data) => {
    try {
      data.profilePicture = profilePicture;
      dispatch(showLoader());
      const res = await updateAdminProfile(data);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {admin?.name}
        </h4>
        <p className="text-base font-normal text-gray-600">Location</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <Form onFinish={handleUpdate}>
            <Form.Item>
              <Input type="file" onChange={handleFileChange} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
