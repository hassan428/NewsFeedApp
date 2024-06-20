import React, {useState} from 'react';
import {Input_cstm} from './Input_cstm';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Custom_input} from './Custom_input';
const styles = StyleSheet.create({
  typeTodo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export const EnterTodo = ({addTodo, delAll}) => {
  const [todo, setTodo] = useState({});
  const [value, setvalue] = useState(todo);
  const {typeTodo} = styles;

  return (
    <View style={typeTodo}>
      <Custom_input
        myStyle={{width: '70%'}}
        value={value}
        placeholder={'Enter Todos'}
        inputValue={e => {
          setvalue(e);
          setTodo(e);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setvalue('');
          addTodo(todo);
        }}>
        <MaterialIcons name="send" size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => delAll()}>
        <MaterialIcons name="delete-sweep" size={25} />
      </TouchableOpacity>
    </View>
  );
};
