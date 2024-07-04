import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'arial',
  },
  input: {
    width: '100%',
    padding: 0,
    margin: 0,
    fontSize: 15,
  },
});
const {fontFamily, input} = styles;

const Custom_input = props => {
  return (
    <TextInput
      mode="outlined"
      right={<TextInput.Icon icon={props.icon} />}
      {...props}
      style={[input, fontFamily]}
      contentStyle={fontFamily}
      onChangeText={text => props.inputValue(text, props.id)}
    />
  );
};

const Password_input = props => {
  const [visibility, setVisibility] = useState(true);
  const toggle = () => setVisibility(pre => !pre);

  return (
    <TextInput
      style={[input]}
      mode="outlined"
      label="Password"
      placeholder="Password"
      secureTextEntry={visibility}
      contentStyle={fontFamily}
      onChangeText={text => props.inputValue(text, 'password')}
      // left={<TextInput.Icon icon="lock-outline" />}
      right={
        visibility ? (
          <TextInput.Icon icon="eye" onPress={toggle} />
        ) : (
          <TextInput.Icon icon="eye-off" onPress={toggle} />
        )
      }
      {...props}
    />
  );
};

export {Custom_input, Password_input};
