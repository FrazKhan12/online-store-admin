import { apiHelper } from "utils/apiHelper";
import { PromiseHandler } from "utils/apiHelper";

export const createCategory = (data) => {
  return PromiseHandler(apiHelper("post", "/api/admin/create-category", data));
};

export const getCategories = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-categories"));
};

export const getSingleCategory = (id) => {
  return PromiseHandler(
    apiHelper("get", `/api/admin/get-single-category/${id}`)
  );
};

export const updateCategory = (id, data) => {
  return PromiseHandler(
    apiHelper("put", `/api/admin/update-category/${id}`, data)
  );
};

export const deleteCategory = (id) => {
  return PromiseHandler(
    apiHelper("delete", `/api/admin/delete-category/${id}`)
  );
};
