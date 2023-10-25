import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '.';
import DetailFoodScreen from '../DetailFood';
import ListFoodTypeScreen from '../ListFoodType';
const HomeStack = createNativeStackNavigator();
const HomeNav = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="DetailFoodScreen" component={DetailFoodScreen} />
      <HomeStack.Screen
        name="ListFoodTypeScreen"
        component={ListFoodTypeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNav;
