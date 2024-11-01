import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { Icon } from "@iconify/react";
import { flattenUrls } from "../../utils/tools";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.product;
  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex p-4 flex-col gap-6 md:flex-row max-w-7xl mx-auto">
      <div className="flex-1 relative min-h-60">
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
            >
              <Icon icon="mdi:chevron-left" />
            </button>
          </>
        )}
        <img
          src={flattenUrls(product.images)[currentImageIndex]}
          alt={product.title}
          className="mb-4 w-full h-auto rounded-lg"
        />
        {product.images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            <Icon icon="mdi:chevron-right" />
          </button>
        )}
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-lg text-gray-700">${product.price}</p>
        <p className="mt-4">{product.description}</p>

        <div className="mt-4 flex items-center">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            <Icon icon="mdi:minus" />
          </button>
          <span className="mx-4 text-lg">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            <Icon icon="mdi:plus" />
          </button>
        </div>

        <button className="mt-6 w-full bg-orange-200  py-2 rounded-md hover:bg-orange-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
