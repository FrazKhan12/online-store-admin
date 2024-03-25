import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { Link } from "react-router-dom";
import { ENV } from "config/config";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({
  title,
  price,
  image,
  handleDeleteProduct,
  extra,
  productID,
}) => {
  const setImage = (img) => {
    return `${ENV.serverURL}/public/${img}`;
  };

  const { admin } = useSelector((state) => state.admin);

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={setImage(image)}
            className="mb-3 h-[350px] w-full rounded-xl 3xl:h-[350px] 3xl:w-full"
            alt=""
          />
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {admin?.name}{" "}
            </p>
          </div>

          {/* <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div> */}
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              {price} <span>USD</span>
            </p>
          </div>
          <div className="flex gap-5">
            <Link to={`/admin/products/edit/${productID}`}>
              <FaEdit style={{ color: "green", cursor: "pointer" }} size={24} />
            </Link>
            <FaTrash
              onClick={() => handleDeleteProduct(productID)}
              style={{ color: "red", cursor: "pointer" }}
              size={22}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
