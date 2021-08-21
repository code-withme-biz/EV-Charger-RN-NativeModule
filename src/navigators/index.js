/**
 * Sample React Native RootNavigator
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { NativeRouter, Route } from 'react-router-native';
import Welcome from '../screens/Welcome';

export const Dimension = {
  viewportWidth: Dimensions.get('window').width,
  viewportHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
  roundScreenWidth: Math.round(Dimensions.get('window').width),
};

const RootNavigator = () => (
  <NativeRouter>
    <View style={styles.container}>
      <Route exact path="/" component={Welcome} />
    </View>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    width: Dimension.viewportWidth,
    height: Dimension.viewportHeight,
  },
});

export default React.memo(RootNavigator);
