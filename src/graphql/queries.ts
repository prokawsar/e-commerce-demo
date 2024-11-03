import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    addUser(data: { email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

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

export const GET_PRODUCTS_BY_PRICE_RANGE = gql`
  query Products($min: Int!, $max: Int!) {
    products(price_min: $min, price_max: $max) {
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
