import { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
};

export default MyApp;