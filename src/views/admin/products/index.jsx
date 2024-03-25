import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import Product from "components/card/Product";
import { useEffect, useState } from "react";
import { getAllProducts } from "actions/productActions";
import { Link } from "react-router-dom";
import { deleteProductById } from "actions/productActions";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/loader";

const Products = () => {
  const [products, setProducts] = useState();
  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllProducts();
      dispatch(hideLoader());

      if (res?.data) {
        setProducts(res?.data?.data);
      }
    } catch (error) {}
  };

  const handleDeleteProduct = async (productID) => {
    try {
      dispatch(showLoader());

      const res = await deleteProductById(productID);
      dispatch(hideLoader());

      if (res?.data) {
        toast.success(res?.data?.message);
        getProducts();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-4">
        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Products
          </h4>
          <div class="text-md linear mt-2 flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-brand-500 text-center text-base font-bold text-white transition   duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white  dark:hover:bg-brand-300 dark:active:bg-brand-200">
            <Link to="/admin/products/add">Add Product</Link>
          </div>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          {products?.map((product) => {
            return (
              <Product
                bidders={[avatar1, avatar2, avatar3]}
                title={product?.productTitle}
                author="Esthera Jackson"
                price={product?.productPrice}
                image={product?.productImage}
                productID={product?._id}
                handleDeleteProduct={() => handleDeleteProduct(product?._id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
