import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const FILTER_PRODUCTS = gql`
  query FilterProducts($categoryId: Float, $price_min: Int, $price_max: Int) {
    products(
      categoryId: $categoryId
      price_min: $price_min
      price_max: $price_max
    ) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Products($id: Float!) {
    products(categoryId: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;

export const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    categories {
      id
      name
      image
    }
  }
`;

export const GET_PROFILE = gql`
  query GerProfile {
    profile {
      id
      name
      avatar
    }
  }
`;
