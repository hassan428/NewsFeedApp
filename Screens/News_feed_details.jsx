import {StyleSheet, Linking, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';

export const News_feed_details = () => {
  const {params} = useRoute();
  const [update_descrip, set_update_descrip] = useState({});
  // console.log('params', params);
  const {title, description, url, id, username, avatar_url, date_time, email} =
    params;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const splitTextAndURLs = text => {
    const parts = text.split(urlRegex);
    return parts;
  };

  const result = splitTextAndURLs(description);
  // console.log('result:', result);

  const LeftContent = () => {
    return avatar_url ? (
      <Avatar.Image size={60} source={{uri: avatar_url}} />
    ) : (
      <Avatar.Text size={60} label={username[0]} />
    );
  };
  const {
    username_style,
    image_style,
    title_style,
    desc_text,
    date_time_style,
    desc_url,
    desc_view,
  } = styles;
  return (
    <>
      <AppBar />
      <Card style={{padding: 5}}>
        <Card.Title
          title={username}
          subtitle={email}
          left={LeftContent}
          style={{gap: 10, right: 10}}
          titleStyle={[username_style]}
        />
        <Card.Cover source={{uri: url}} style={image_style} />
        <Card.Content>
          <Text variant="headlineMedium" style={title_style}>
            {title}
          </Text>
          <Text style={[desc_view]}>
            {result.map((text, i) => {
              const isURL = text.match(urlRegex);
              return isURL ? (
                <Text
                  variant="bodyLarge"
                  onPress={() => Linking.openURL(text)}
                  style={[desc_url]}
                  key={i}>
                  {text}
                </Text>
              ) : (
                <Text variant="bodyLarge" style={desc_text} key={i}>
                  {text}
                </Text>
              );
            })}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Text variant="labelMedium" style={[date_time_style]}>
            {date_time}
          </Text>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  username_style: {
    fontWeight: 900,
    fontSize: 22,
    top: 5,
  },
  image_style: {
    paddingVertical: 10,
  },
  title_style: {
    paddingTop: 5,
    borderColor: 'gray',
  },
  desc_view: {
    flexDirection: 'row',
  },
  desc_text: {
    color: 'gray',
  },
  desc_url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  date_time_style: {
    maxHeight: 100,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
