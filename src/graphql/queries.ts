import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query {
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
      title
      price
    }
  }
`;

export const GET_PRODUCTS_BY_PRICE = gql`
  query {
    products(price: 100) {
      title
      price
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Product($id: Float!) {
    products(categoryId: $id) {
      title
      price
    }
  }
`;

export const GET_PRODUCTS_BY_PRICE_RANGE = gql`
  query Products($min: Int!, $max: Int!) {
    products(price_min: $min, price_max: $max) {
      title
      price
    }
  }
`;
