import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 2,
    width: '100%',
  },
  individual_div: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgb(255, 184, 184)',
    padding: 5,
    paddingHorizontal: 10,
    fontSize: '50px',
    flexDirection: 'row',
    marginHorizontal: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn_div: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
});
export const RenderTodo = ({todo, edit, del}) => {
  const [render, setRender] = useState(todo);

  useEffect(() => {
    if (todo) setRender(todo);
    else setRender([]);
  }, [todo]);

  const {container, individual_div, text, btn_div} = styles;

  return (
    <ScrollView style={container}>
      <View>
        {render.map(({key, value}, i) => {
          return (
            <View key={i} style={[container, individual_div]}>
              <Text style={text}>{value}</Text>

              <View style={[btn_div]}>
                <TouchableOpacity onPress={() => edit(key)}>
                  <MaterialIcons name="edit-note" size={30} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => del(key)}>
                  <MaterialIcons name="delete" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
