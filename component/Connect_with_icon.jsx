import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {IconButton} from 'react-native-paper';

const icon = [
  {
    icon: 'facebook',
    iconColor: 'blue',
    size: 40,
  },
  {
    icon: 'instagram',
    iconColor: '#C10654',
    size: 40,
  },
  {
    icon: 'linkedin',
    iconColor: '#126bc4',
    size: 40,
  },
  {
    icon: 'github',
    iconColor: 'black',
    size: 40,
  },
];

const Connect_with_icon = () => {
  const {icon_view} = styles;

  return (
    <View style={[icon_view]}>
      {icon.map((obj, i) => (
        <IconButton {...obj} key={i} onPress={() => console.log('Pressed')} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  icon_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {Connect_with_icon};
