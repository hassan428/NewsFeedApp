import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SomeText} from './Text_component';

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
  },
});

const {image} = styles;

const Custom_image = ({myStyle, source}) => {
  return (
    <Image resizeMode="contain" style={[image, {...myStyle}]} source={source} />
  );
};

export {Custom_image};
