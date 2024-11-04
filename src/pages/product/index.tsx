import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { Icon } from "@iconify/react";
import { flattenUrls } from "@/utils/tools";
import { useCartStore } from "@/store/index";
import { GetProductByIdResponse, Product } from "@/graphql/types";
import Image from "@/components/Image";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { withAuth } = useProtectedAction();

  const { error, data } = useSuspenseQuery<GetProductByIdResponse>(
    GET_PRODUCT_BY_ID,
    {
      errorPolicy: "all",
      variables: { id },
    }
  );
  const { addItem } = useCartStore();

  if (error) return <ErrorMessage message={error.message} />;

  const product: Product = { ...data.product, quantity: 1 };

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

  const handleAddToCart = () => {
    product.quantity = quantity;
    withAuth(addItem, product);
  };

  return (
    <div className="flex p-4 flex-col gap-6 md:flex-row max-w-7xl mx-auto">
      <div className="flex-1 relative min-h-60">
        {product.images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            <Icon icon="mdi:chevron-left" />
          </button>
        )}
        <Image
          src={flattenUrls(product.images)[currentImageIndex]}
          alt={product.title}
          styles={"mb-4 w-full h-auto rounded-lg hover:!scale-100"}
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
        <p className="text-lg">{product.category.name}</p>
        <p className="my-3">{product.description}</p>
        <p className="text-lg text-gray-700 font-bold">${product.price}</p>

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

        <button
          onClick={handleAddToCart}
          className="mt-6 w-full bg-yellow-400  py-2 rounded-md hover:bg-yellow-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
