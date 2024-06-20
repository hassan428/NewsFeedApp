import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'arial',
  },
  input: {
    width: '85%',
    padding: 0,
    fontSize: 15,
  },
  input_view: {
    marginVertical: 20,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
const {fontFamily, input_view, input} = styles;

const Custom_input = props => {
  return (
    <View style={[input_view, {...props.myStyle}]}>
      {props.icon}
      <TextInput
        {...props}
        style={[input, fontFamily]}
        onChangeText={text => props.inputValue(text, props.id)}
      />
    </View>
  );
};

const Password_input = ({myStyle, inputValue}) => {
  const [visibility, setVisibility] = useState(true);

  return (
    <View style={[input_view, {...myStyle}]}>
      <Octicons size={25} name="lock" />
      <TextInput
        placeholder="Password"
        style={[input, fontFamily]}
        secureTextEntry={visibility}
        onChangeText={text => inputValue(text, 'password')}
      />
      {visibility ? (
        <MaterialIcons
          onPress={() => setVisibility(false)}
          size={25}
          name="visibility"
        />
      ) : (
        <MaterialIcons
          onPress={() => setVisibility(true)}
          size={25}
          name="visibility-off"
        />
      )}
    </View>
  );
};

export {Custom_input, Password_input};
