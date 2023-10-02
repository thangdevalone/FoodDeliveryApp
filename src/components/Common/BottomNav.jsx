import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { colorDF1 } from '../../utils/colors';
import Cart from '../../views/Cart';
import Home from '../../views/Home';

import {
  BagBold,
  BagOutline,
  MesageOutline,
  MessageBold,
  ShopBold,
  ShopOutline,
  UserBold,
  UserOutline,
} from '../Icons';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();

const iconComponents = {
  Home: {focused: ShopBold, unfocused: ShopOutline},
  Cart: {focused: BagBold, unfocused: BagOutline},
  Messages: {focused: MessageBold, unfocused: MesageOutline},
  Profile: {focused: UserBold, unfocused: UserOutline},
};


export function BottomNav() {
  const translateY = React.useRef(new Animated.Value(0)).current;
  const dir=useSelector((state)=>state.app.dir)
  
  useEffect(()=>{
    if(dir==="down"){
      Animated.timing(translateY, {
        toValue: 55,
        duration: 250, // Animation duration in milliseconds
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
    if(dir==="up"){
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250, // Animation duration in milliseconds
        useNativeDriver: true, // Use native driver for performance
      }).start();
    }
  },[dir])
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colorDF1,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({color, focused, size}) => {
          const IconComponent = focused
            ? iconComponents[route.name].focused
            : iconComponents[route.name].unfocused;

          return (
            <IconComponent color={focused ? colorDF1 : color} size={size} />
          );
        },
        tabBarStyle: {
          height: 55,
          paddingTop: 10,
          position:"absolute",
          transform:[{translateY}],
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
        component={Home}
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
