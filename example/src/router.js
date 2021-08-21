import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//= ================= screen components=============================

import Home from './screens/Home';

const Stack = createStackNavigator();

const NativeStack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <NativeStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false, screenOrientation: 'portrait' }}
    >
      <NativeStack.Screen name="Main" component={MainStack} />
    </NativeStack.Navigator>
  );
};

export default React.memo(RootStack);
