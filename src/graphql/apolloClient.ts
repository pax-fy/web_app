import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const API_URL = 'https://indexer.crossbell.io/v1/graphql'
const API_URL_2 = "https://avalanche-fuji.graph-eu.p2pify.com/736b4e37c907874bab701b3487b64803/paxfy"
export const apolloClient = new ApolloClient({
    uri: API_URL_2,
    cache: new InMemoryCache(),
  });