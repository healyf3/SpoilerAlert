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
//import SpaNavigator from './src/SpaNavigator';
//import AppNavigator from './src/SpaNavigator';
import Router from './src/Router';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

enableScreens();
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

//const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
        //  <ApolloProvider client={client}>
        // </ApolloProvider>
        //<SpaNavigator />
        //<View style={{flex:1}, {backgroundColor: 'white'}}>
        //  <View style={{length: '100%'}, {backgroundColor: 'white'}}>
        //    <Text style={{flex: 1}, {backgroundColor: 'purple'}}>HIIIII</Text>
        //  </View>
        //</View>
            <Router/>
    );
  }
}

        //<Router/>
