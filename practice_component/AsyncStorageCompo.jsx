import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageCompo = () => {
  const setData = () => {
    // Setting an item
    AsyncStorage.multiSet([
      ['user', JSON.stringify({name: 'hassan', age: 19})],
      ['user2', JSON.stringify({name: 'waseem', age: 20})],
      ['user3', JSON.stringify(['asad', 20])],
      ['user4', 'qasim'],
      ['user5', '100'],
    ])
      .then(res => console.log('res', res))
      .catch(err => console.log('err', err));
  };

  const getData = () => {
    AsyncStorage.getAllKeys().then(res => {
      console.log(res);
    });
    // AsyncStorage.getAllKeys()
    //   .then(res => {
    //     // res = JSON.parse(res);
    //     AsyncStorage.multiGet(res).then(res =>
    //       res.map(value => {
    //         // value = JSON.parse(value);
    //         console.log('value', typeof value, value);
    //       }),
    //     );

    //     console.log('res', typeof res, res);
    //   })
    //   .catch(err => console.log('err', err));
  };

  const mergeData = () => {
    AsyncStorage.multiMerge([
      ['user', JSON.stringify({grade: 'A'})],
      ['user2', JSON.stringify({grade: 'A'})],
    ]);
  };

  const removeData = () => {
    AsyncStorage.getAllKeys().then(res => {
      const selectRemoveKey = res.filter(
        key => key == 'user4' || key == 'user5',
      );
      AsyncStorage.multiRemove(selectRemoveKey)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });

    // AsyncStorage.clear().then(res => console.log('res', res));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
      }}>
      <TouchableOpacity onPress={setData}>
        <Text style={{fontFamily: 'arial'}}>Set Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getData}>
        <Text style={{fontFamily: 'arial'}}>Get Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={mergeData}>
        <Text style={{fontFamily: 'arial'}}>Merge Data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeData}>
        <Text style={{fontFamily: 'arial'}}>Remove Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AsyncStorageCompo;

const styles = StyleSheet.create({});
