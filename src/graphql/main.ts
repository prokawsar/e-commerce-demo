import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.escuelajs.co/graphql",
});

const getAuthToken = () => {
  try {
    const userStoreData = localStorage.getItem("user-storage");
    if (userStoreData) {
      const { state } = JSON.parse(userStoreData);
      return state?.userData?.access_token;
    }
    return null;
  } catch {
    return null;
  }
};

const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const graphQlClient = new ApolloClient({
  // uri: "https://api.escuelajs.co/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
