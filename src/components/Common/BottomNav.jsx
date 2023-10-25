import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import Cart from '../../views/Cart';
import Home from '../../views/Home';

import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { ColorApp } from '../../utils/colors';
import Profile from '../../views/Profile';
import {
  BagBold,
  BagOutline,
  ShopBold,
  ShopOutline,
  UserBold,
  UserOutline
} from '../Icons';
import HomeNav from '../../views/Home/HomeNav';
const Tab = createBottomTabNavigator();

const iconComponents = {
  Home: {focused: ShopBold, unfocused: ShopOutline},
  Cart: {focused: BagBold, unfocused: BagOutline},
  Profile: {focused: UserBold, unfocused: UserOutline},
};


export function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor:ColorApp.color_blue,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({color, focused, size}) => {
          const IconComponent = focused
            ? iconComponents[route.name].focused
            : iconComponents[route.name].unfocused;

          return (
            <IconComponent color={focused ?ColorApp.color_blue : color} size={size} />
          );
        },
        tabBarStyle: {
          height: 55,
          paddingTop: 10,
          position:"absolute",
          bottom:0,
          left:0,
        },
      })}>
      <Tab.Screen
        name="Home"
        options={({navigation}) => ({
          tabBarLabelStyle: {
            fontWeight: navigation.isFocused() ? '600' : '400',
            fontSize: 13,
            marginTop: 5,
          },
          headerShown: false,
        })}
        component={HomeNav}
      />
      <Tab.Screen
        name="Cart"
        options={({navigation}) => ({
          tabBarLabelStyle: {
            fontWeight: navigation.isFocused() ? '600' : '400',
            fontSize: 13,
            marginTop: 5,
          },
          headerShown: false,
        })}
        component={Cart}
      />
      <Tab.Screen
        name="Profile"
        options={({navigation}) => ({
          tabBarLabelStyle: {
            fontWeight: navigation.isFocused() ? '600' : '400',
            fontSize: 13,
            marginTop: 5,
          },
          headerShown: false,
        })}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
