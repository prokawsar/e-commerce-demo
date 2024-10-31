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
export const GET_PRODUCT_BY_FILTER = gql`
  query {
    products(title: "Generic") {
      title
      price
    }
  }
`;

export const GET_PRODUCT_BY_CATEGORY = gql`
  query {
    products(categoryId: 1) {
      title
      price
    }
  }
`;
