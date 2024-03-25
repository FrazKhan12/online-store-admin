const { apiHelper } = require("utils/apiHelper");
const { PromiseHandler } = require("utils/apiHelper");

export const addAdmin = (data) => {
  return PromiseHandler(apiHelper("post", "/api/admin/admin-register", data));
};

export const adminLogin = (data) => {
  const res = PromiseHandler(apiHelper("post", "/api/admin/admin-login", data));
  return res;
};

export const getAdminDataByID = () => {
  return PromiseHandler(apiHelper("post", "/api/admin/get-admin-info-by-id"));
};

export const getAllAdmins = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-all-admins"));
};

export const getAllAdminRoles = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-all-roles"));
};

export const updateAdminProfile = (id, data) => {
  return PromiseHandler(
    apiHelper("post", `/api/admin/update-admin-profile/${id}`, data)
  );
};

export const getSingelAdminData = (id) => {
  return PromiseHandler(apiHelper("get", `/api/admin/get-single-admin/${id}`));
};

export const deleteAdminById = (id) => {
  return PromiseHandler(apiHelper("delete", `/api/admin/delete-admin/${id}`));
};
