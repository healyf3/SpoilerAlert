import React, {Component} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, createAppContainer } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//import reducers from './src/reducers';
import Router from './src/Router';
import Profile from './src/components/Profile';

const BASE_URL = 'http://192.168.1.83:8000/graphql';

const httpLink = new HttpLink({
  uri: BASE_URL,
  //headers: {
  //  authorization: `Bearer ${
  //    process.env.SECRET
  //  }`,
  //},
});

enableScreens();
const cache = new InMemoryCache();

  //link: BASE_URL,
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Profile/>
      </ApolloProvider>
    );
  }
}

        //<Router/>
