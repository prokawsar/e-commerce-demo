import { Product } from "@/graphql/types";
import { ProductCard } from "@/components/ProductCard";
import { useCallback } from "react";

export default function ProductGrid({
  products,
  showAll = false,
}: {
  products: { products: Product[] };
  showAll?: boolean;
}) {
  const getDisplayProducts = useCallback(() => {
    const allProducts = products.products;

    if (showAll) {
      return allProducts;
    }

    return allProducts?.slice(0, 9);
  }, [products, showAll]);

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
      {!getDisplayProducts().length && (
        <>
          <p></p>
          <p className="text-center text-xl">No product found</p>
          <p></p>
        </>
      )}

      {getDisplayProducts()?.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
