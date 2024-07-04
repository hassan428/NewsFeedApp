import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Logo = ({iconSize, fontSize}) => {
  const icon = [
    {
      Tag: MaterialIcons,
      name: 'public',
      color: '#4c5ca2',
    },
    {
      Tag: FontAwesome5,
      name: 'rss',
      color: '#fec549',
    },
    {
      Tag: MaterialIcons,
      name: 'article',
      color: '#4CAF50',
    },
  ];

  const text = [
    {
      letter: 'NEW',
      color: '#4c5ca2',
    },
    {
      letter: 'SF',
      color: '#fec549',
    },
    {
      letter: 'EED',
      color: '#4CAF50',
    },
  ];

  const {iconContainer, iconSpacing, splash_text, container} = styles;
  return (
    <View style={[, container]}>
      <View style={iconContainer}>
        {icon.map(({Tag, name, color}, i) => (
          <Tag
            name={name}
            style={iconSpacing}
            size={iconSize}
            color={color}
            key={i}
          />
        ))}
      </View>

      <View>
        <Text style={[splash_text, {fontSize}]}>
          {text.map(({letter, color}, i) => (
            <Text style={{color}} key={i}>
              {letter}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 2,
    marginRight: 2,
  },
  splash_text: {
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'arial',
  },
});
