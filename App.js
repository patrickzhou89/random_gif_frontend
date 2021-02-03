import React, {Component} from 'react';
import {Dimensions, StyleSheet, View } from 'react-native';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import GifViewer from './src/GifViewer'

require('dotenv').config();

const LAN_IP = process.env.LAN_IP;

const link = new createHttpLink({
  uri: LAN_IP? LAN_IP : 'http://localhost:4000'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache
  });

class App extends Component {
  render(){     
    return(
      <ApolloProvider client={client}>
          <View style={styles.container}>
            <GifViewer/>
          </View>
      </ApolloProvider>
    )
  }
}

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default App;