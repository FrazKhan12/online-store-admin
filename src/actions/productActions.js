const { apiHelper } = require("utils/apiHelper");
const { PromiseHandler } = require("utils/apiHelper");

export const createProduct = (data) => {
  return PromiseHandler(apiHelper("post", "/api/admin/add-product", data));
};

export const getAllProducts = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-products"));
};

export const deleteProductById = (id) => {
  return PromiseHandler(apiHelper("delete", `/api/admin/delete-product/${id}`));
};

export const getSingleProductById = (id) => {
  return PromiseHandler(
    apiHelper("get", `/api/admin/get-single-product/${id}`)
  );
};

export const updateSingleProductById = (id, data) => {
  return PromiseHandler(
    apiHelper("post", `/api/admin/update-product/${id}`, data)
  );
};
