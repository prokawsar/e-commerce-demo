import { Category, Product } from "@/graphql/types";

export const flattenUrls = (urls: string[]) => {
  return urls.map((url) => url.replaceAll(/^"|\["|"\]|"$/g, ""));
};

export const sortByPrice = (prices: Product[], direction: string) => {
  return prices.sort((a, b) => {
    if (direction === "asc") {
      return a.price - b.price;
    } else if (direction === "desc") {
      return b.price - a.price;
    }
    return 0;
  });
};

export const categoryAll: Category = {
  name: "All",
  id: "all",
  image: "",
};
