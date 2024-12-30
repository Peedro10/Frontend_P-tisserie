import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ap-south-1.cdn.hygraph.com/content/cm4wngdwv04am07w6ts9q0i4r/master',
  cache: new InMemoryCache(),
});

export default client;
