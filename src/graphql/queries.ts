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

export const GET_PRODUCTS_BY_PRICE = gql`
  query ProductsByPrice {
    products(price: 100) {
      title
      price
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query Products($id: Float!) {
    products(categoryId: $id) {
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
      title
      price
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
