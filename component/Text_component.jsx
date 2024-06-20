import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
  },
  fontFamily: {
    fontFamily: 'arial',
  },
  heading_text: {
    width: 250,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 25,
  },
});

const {heading, fontFamily, heading_text} = styles;

const Heading = ({myStyle, text}) => {
  return <Text style={[heading, fontFamily, {...myStyle}]}>{text}</Text>;
};

const HeadingText = ({myStyle, text}) => {
  return (
    <Text style={[heading_text, fontFamily, {...myStyle}]}>
      {' '}
      By {text} you are agreeing our{' '}
      <Text style={{color: 'blue'}}>Term and Privacy Policy</Text>
    </Text>
  );
};

const SomeText = ({myStyle, text}) => {
  return <Text style={[fontFamily, {...myStyle}]}>{text}</Text>;
};

export {Heading, HeadingText, SomeText};
