import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../actions/adminActions";

import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../redux/loader";
import { useDispatch } from "react-redux";
import { ENV } from "config/config";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    try {
      dispatch(showLoader());
      const res = await adminLogin(data);
      dispatch(hideLoader());

      if (res) {
        dispatch(hideLoader());

        toast.success(res?.data?.message);
        navigate("/");
        localStorage.setItem("token", res?.data?.data);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div> */}
        {/* <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            className="ml-1.5 text-sm font-medium
            text-navy-700 dark:text-white"
            label="Email"
            name="email"
            rules={[
              {
                message: "Please input your Email!",
              },
            ]}
          >
            <Input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none " />
          </Form.Item>
          <Form.Item
            className="ml-1.5 text-sm font-medium
            text-navy-700 dark:text-white"
            label="Password"
            name="password"
            rules={[
              {
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              className="mt-2 flex h-12 w-full items-center justify-center
            rounded-xl border bg-white/0 p-3 text-sm outline-none "
            />
          </Form.Item>
          <div className="mb-4 flex items-center justify-between px-2">
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <Form.Item>
            <Button
              className="linear mt-2 h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to="/auth/sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div> */}
      </div>
    </div>
  );
}
