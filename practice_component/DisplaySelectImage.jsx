import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CameraCompo} from './CameraCompo';
import {Image} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const DisplaySelectImage = () => {
  const [image_uri, set_image_uri] = useState('');
  const {container, cell, row, button, shadow, buttonText} = styles;

  return image_uri == '' ? (
    <CameraCompo selected_image_uri={set_image_uri} />
  ) : (
    <>
      <View style={{margin: 10}}>
        <View style={[row, {justifyContent: 'space-between'}]}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            onPress={() => set_image_uri('')}
          />
          <Text style={[buttonText, {color: 'black'}]}>Back</Text>
          <MaterialCommunityIcons
            name="checkbox-multiple-marked-outline"
            size={25}
          />
        </View>
      </View>
      <View style={[container, {flex: 1}]}>
        <Image
          resizeMode="contain"
          source={{
            uri: image_uri,
          }}
          style={[{width: 640, height: 640}]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
  },
  cell: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 100, height: 2},
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
  },
});
