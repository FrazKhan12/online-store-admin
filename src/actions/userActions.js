import { apiHelper } from "utils/apiHelper";
import { PromiseHandler } from "utils/apiHelper";

export const getUsers = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-all-users"));
};
