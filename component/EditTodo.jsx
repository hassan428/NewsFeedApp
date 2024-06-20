import React, {useState} from 'react';
import {Input_cstm} from './Input_cstm';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Custom_input} from './Custom_input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  typeTodo: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flex_class: {
    flex: 1,
    flexDirection: 'row',
  },
});

export const EditTodo = ({edit_done, edit_cancel, defaultValue}) => {
  const [todo, setTodo] = useState({});
  const [value, setvalue] = useState(todo);
  const {typeTodo, flex_class} = styles;

  return (
    <View
      style={{
        flex_class,
        alignItems: 'flex-end',
      }}>
      <View style={[flex_class, typeTodo]}>
        <Custom_input
          myStyle={{width: '70%'}}
          value={value}
          placeholder={`Enter Edit Todos: ${defaultValue}`}
          defaultValue={defaultValue}
          inputValue={e => {
            setvalue(e);
            setTodo(e);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setvalue('');
            edit_done(todo);
          }}>
          <MaterialIcons name="send" size={25} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => edit_cancel()}>
          <MaterialIcons name="delete" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
