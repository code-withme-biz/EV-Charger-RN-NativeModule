/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { UIManager, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';
import { navigationRef, isReadyRef } from './RootNavigation';
import RootStack from './router';

enableScreens();
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        fallback={null}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default React.memo(App);
