import { apiHelper } from "utils/apiHelper.js";
import { PromiseHandler } from "utils/apiHelper.js";

export const createAdminRole = (data) => {
  return PromiseHandler(apiHelper("post", "/api/admin/create-role", data));
};

export const getSingleRoleById = (id) => {
  return PromiseHandler(apiHelper("get", `/api/admin/get-role-by-id/${id}`));
};

export const updateSingleRoleById = (id, data) => {
  return PromiseHandler(apiHelper("put", `/api/admin/update-role/${id}`, data));
};

export const deleteSingleRoleById = (id) => {
  return PromiseHandler(apiHelper("delete", `/api/admin/delete-role/${id}`));
};
