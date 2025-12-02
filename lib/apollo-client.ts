import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
