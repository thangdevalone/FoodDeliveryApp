import {TransitionPresets} from '@react-navigation/stack';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import AppLayout from './src/components/AppLayout';
import {useUserInfor} from './src/hooks';
import FirstView from './src/views/FirstView';
import LoginPage from './src/views/auth/pages/LoginPage';
import RegisterPage from './src/views/auth/pages/RegisterPage';
import Payment from './src/views/Payment';

const Stack = createNativeStackNavigator();

const App = () => {
  const user = useUserInfor();
  console.log(user)
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.DefaultTransition,
          }}>
          {!user ? (
            <>
              <Stack.Screen
                name="FirstView"
                component={FirstView}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterPage}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="AppLayout"
                component={AppLayout}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
