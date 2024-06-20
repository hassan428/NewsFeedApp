import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SomeText} from './Text_component';

const styles = StyleSheet.create({
  bottom_image: {
    width: '100%',
    height: 165,
  },
  bottom_image_text: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
  },
});

const {bottom_image, bottom_image_text} = styles;

const Bottom_Image = ({myStyle, myStyleText, text, source}) => {
  return (
    <ImageBackground
      resizeMode="stretch"
      style={[bottom_image, {...myStyle}]}
      source={source}>
      <View style={[bottom_image, bottom_image_text]}>
        <SomeText text={text} myStyle={{...myStyleText}} />
      </View>
    </ImageBackground>
  );
};

export {Bottom_Image};
