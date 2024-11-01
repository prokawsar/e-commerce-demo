import { Icon } from "@iconify/react";
import { flattenUrls } from "../utils/tools";

export const ProductCard = ({ product }) => {
  const handleAddtoCart = (product) => {};

  return (
    <>
      <a href={`/product/${product.id}`} className="flex flex-col p-2">
        <img
          src={flattenUrls(product.images)[0]}
          className="bg-gray-50 rounded-lg  h-64 object-cover object-center hover:scale-105"
        />
        <p className="font-bold mt-2">{product.title}</p>
        <p className="text-gray-600 capitalize">{product.category.name}</p>
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-orange-500">${product.price}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddtoCart(product);
            }}
            className="hover:scale-110 hover:!text-black text-gray-500 bg-gray-100 rounded-full items-center justify-center flex h-8 w-8"
          >
            <Icon icon="fa-solid:cart-plus" className="" />
          </button>
        </div>
      </a>
    </>
  );
};
