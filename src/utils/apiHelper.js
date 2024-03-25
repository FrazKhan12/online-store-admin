import axios from "axios";
import { ENV } from "../config/config";
import toast from "react-hot-toast";

let baseUrl = ENV.serverURL;

const apiHelper = async (apiType, path, data) => {
  if (baseUrl === undefined || !baseUrl) {
    baseUrl = "";
  }

  let token = localStorage.getItem("token");

  if (
    apiType === "post" ||
    apiType === "put" ||
    apiType === "get" ||
    apiType === "delete"
  ) {
    try {
      let response = await axios({
        method: apiType,
        url: `${baseUrl + path}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          toastId: "005",
        });
        return;
      } else {
        toast?.error(error?.message, {
          toastId: "005",
        });
      }
    }
  }
};
const PromiseHandler = async (method) => {
  try {
    return await method;
  } catch (error) {
    console.log(error);
  }
};

export { PromiseHandler, apiHelper };
