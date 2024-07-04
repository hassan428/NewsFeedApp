import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {News_feed} from './News_feed';
import {Post_news_feed} from './Post_news_feed';
const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  // const {params} = useRoute();
  const tabScreenArray = [
    {
      name: 'News Feed',
      component: News_feed,
      // initialParams: params,
      options: {
        tabBarIcon: ({color, size, focused}) => (
          <Ionicons size={size} name="newspaper" color={color} />
        ),
        tabBarLabelStyle: {fontSize: 15},
      },
    },
    {
      name: 'Post Feed',
      component: Post_news_feed,
      // initialParams: params,
      options: {
        tabBarIcon: ({color, size, focused}) => (
          <MaterialIcons size={size} name="post-add" color={color} />
        ),
        tabBarLabelStyle: {fontSize: 15},
      },
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4c5ca2',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#fec549',
        tabBarInactiveBackgroundColor: 'white',
      }}>
      {tabScreenArray.map((screenDetals, i) => (
        <Tab.Screen key={i} {...screenDetals} />
      ))}
    </Tab.Navigator>
  );
};
