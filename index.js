import React from 'react';
import { registerRootComponent } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client';
import App from './App';

// const host = "http://10.0.2.2:4000/graphql";
const host = "http://192.168.1.8:4000/graphql";

const authLink = setContext(( _ , { headers } ) => {
    return {
        headers: {
            ...headers
        }
    }
});

const httpLink = createUploadLink({uri: host});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
const MapToAplloServer = () => <ApolloProvider client={client} ><App /></ApolloProvider> 

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(MapToAplloServer);
