import { Product } from "@/graphql/types";
import { ProductCard } from "@/components/ProductCard";
import { useMemo } from "react";
import { sortByPrice } from "@/utils/tools";

export default function ProductGrid({
  products,
  showAll = false,
  sortDirection,
}: {
  products: { products: Product[] };
  showAll?: boolean;
  sortDirection?: string;
}) {
  const getDisplayProducts = useMemo(() => {
    const allProducts = products.products;

    if (showAll) {
      if (allProducts && sortDirection)
        return sortByPrice([...allProducts], sortDirection);
      return allProducts;
    }
    if (sortDirection) {
      return sortByPrice([...allProducts], sortDirection).slice(0, 9);
    }

    return allProducts?.slice(0, 9);
  }, [products, showAll, sortDirection]);

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-4">
      {!getDisplayProducts.length && (
        <>
          <p></p>
          <p className="text-center text-xl">No product found</p>
          <p></p>
        </>
      )}

      {getDisplayProducts?.map((product: Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
