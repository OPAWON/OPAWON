// App.js

import React, { useEffect, useState } from 'react';
import { StatusBar, Alert, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeTabNavigator from './screens/HomeTabNavigator';
import ExpenseTracker from './screens/ExpenseTracker';
import BillsSchedule from './screens/BillsSchedule';
import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();

const App = () => {
  const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] = useState(false);

  useEffect(() => {
    const configurePushNotification = async () => {
      try {
        await PushNotification.createChannel(
          {
            channelId: 'default-channel-id', // you can add any unique channel ID here
            channelName: 'Default Channel',
            channelDescription: 'A default channel',
            soundName: 'default',
            importance: 4,
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`)
        );

        PushNotification.configure({
          onNotification: function (notification) {
            // Handle notification
            Alert.alert(notification.title, notification.message);
          },
          popInitialNotification: true,
          requestPermissions: true,
        });

        // Check if notification permissions are already granted
        const granted = await PushNotification.arePermissionsGranted();
        setIsNotificationPermissionGranted(granted);
      } catch (error) {
        console.error('Error configuring push notification:', error);
      }
    };

    configurePushNotification();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
