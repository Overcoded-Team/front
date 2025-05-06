import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import PostsScreen from './PostsScreen';
import InspirationsScreen from './InspirationsScreen';
import ChefsScreen from './ChefsScreen';
import TrolleyScreen from './TrolleyScreen';
import MixMatchScreen from './MixMatchScreen';
import ItalianaScreen from './ItalianaScreen';
import SaudavelScreen from './SaudavelScreen';
import CarnesScreen from './CarnesScreen';

export type RootStackParamList = {
  home: undefined;
  posts: undefined;
  inspirations: undefined;
  chefs: undefined;
  trolley: undefined;
  mix: undefined;
  italiana: undefined;
  saudavel: undefined;
  carnes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Chef Now' }} />
        <Stack.Screen name="posts" component={PostsScreen} />
        <Stack.Screen name="inspirations" component={InspirationsScreen} />
        <Stack.Screen name="chefs" component={ChefsScreen} />
        <Stack.Screen name="trolley" component={TrolleyScreen} />
        <Stack.Screen name="mix" component={MixMatchScreen} />
        <Stack.Screen name="italiana" component={ItalianaScreen} />
        <Stack.Screen name="saudavel" component={SaudavelScreen} />
        <Stack.Screen name="carnes" component={CarnesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}