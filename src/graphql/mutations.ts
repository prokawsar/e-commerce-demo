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
