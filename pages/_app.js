import 'react-quill/dist/quill.snow.css'; 
import "../styles/main.scss";
import 'nprogress/nprogress.css';
import App from "next/app";
import { Provider } from "../context";
import Head from 'next/head'; // import <head/>

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider>

        <Head>
          <title>SeeThis - Top Spots</title>
          <meta name='description' content='Top Spots in Slovakia' />
          <link rel="shortcut icon" href="/favicon.png" /> {/* favicon must be in: /public/favicon.png */}
          {/* you can place here <links /> as well =. e.g.: bootstrap CDN... */}
        </Head>

        <Component {...pageProps} />
        
      </Provider>
    );
  }
}

export default MyApp;





/* WHERE I GOT STUCK:
import { useContext, useEffect } from "react";
import "../styles/main.scss";
import { Provider, Context } from "../context";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from '../config';



const MyApp = ({ Component, pageProps }) => {
  //GET STATE FROM CONTEXT (to get user from it)
  let state;
  let client = new ApolloClient({cache: new InMemoryCache()});
  
  if (typeof window !== 'undefined') {
    state = useContext(Context.state);
    client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(),
      request: operation => {
        operation.setContext({
          headers: {
            authtoken: state && state.user ? state.user.token : ''
          }
        })
      }
    });

    console.log(state)
  }



  //RENDER
  return (
    <Provider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

*/