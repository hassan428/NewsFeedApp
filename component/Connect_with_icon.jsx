import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
const styles = StyleSheet.create({
  icon_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
});

const {icon_view} = styles;
const Connect_with_icon = () => {
  return (
    <View style={[icon_view]}>
      <Ionicons size={40} color={'blue'} name="logo-facebook" />
      <Entypo size={40} color={'#C10654'} name="instagram-with-circle" />
      <Entypo size={40} color={'#0386D0'} name="linkedin-with-circle" />
      <Octicons size={40} name="mark-github" />
    </View>
  );
};

export {Connect_with_icon};
