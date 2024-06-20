import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Todo} from './Todos';
import {SignUp} from './SignUp';
import {LogIn} from './LogIn';
const Tab = createBottomTabNavigator();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomTabs = () => {
  const tabScreenArray = [
    {
      name: 'Todo',
      component: Todo,
      options: {
        tabBarIcon: ({color, size, focused}) => (
          <MaterialIcons size={size} name="schedule" color={color} />
        ),
      },
    },
    // {
    //   name: 'SignUp',
    //   component: SignUp,
    //   options: {
    //     tabBarIcon: ({color, size, focused}) => (
    //       <FontAwesome size={size} name="sign-in" color={color} />
    //     ),
    //   },
    // },
    // {
    //   name: 'LogIn',
    //   component: LogIn,
    //   options: {
    //     tabBarIcon: ({color, size, focused}) => (
    //       <FontAwesome size={size} name="sign-in" color={color} />
    //     ),
    //   },
    // },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Todo"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'pink',
        tabBarInactiveBackgroundColor: 'white',
      }}>
      {tabScreenArray.map(({name, component, options}, i) => (
        <Tab.Screen
          name={name}
          component={component}
          key={i}
          options={options}
        />
      ))}
    </Tab.Navigator>
  );
};

export {BottomTabs};

const styles = StyleSheet.create({});
