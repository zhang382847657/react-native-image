/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import ReacNativeImage from './RNImage/rn-image'

export default class RNImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ReacNativeImage style={styles.icon}
                         source={{uri:'https://pic.qianmi.com/ejz/ejz2.0/img/mdygimg.png'}}
                         minShowImageTime={500}
                         isOpenCache={false}
                         // source={require('./image/error.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
      width:60,
      height:60,
      resizeMode:'contain'
  }
});

AppRegistry.registerComponent('RNImage', () => RNImage);
