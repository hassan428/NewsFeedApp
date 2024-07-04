import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, SegmentedButtons} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'arial',
  },
  submit_btn: {
    width: '100%',
    padding: 5,
    backgroundColor: '#fec549',
    borderRadius: 10,
  },
  submit_btn_text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#4c5ca2',
  },
});
const {fontFamily, submit_btn, submit_btn_text} = styles;

export const Submit_btn = props => {
  const {myStyle, myLabelStyle, text, onPress} = props;
  return (
    <Button
      onPress={onPress}
      style={[submit_btn, {...myStyle}]}
      labelStyle={[submit_btn_text, fontFamily, {...myLabelStyle}]}
      {...props}>
      {text}
    </Button>
  );
};

export const Swith_screen = props => {
  const {navigate} = useNavigation();
  const [value, setValue] = React.useState('');

  // console.log(value);

  const navigate_screen = val => {
    setValue(val);
    navigate(val);
  };

  return (
    <SegmentedButtons
      style={{marginBottom: 10}}
      {...props}
      value={value}
      onValueChange={navigate_screen}
    />
  );
};
