import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

export const News_card = props => {
  const {
    image_uri,
    avatar_url,
    username,
    title,
    description,
    date_time,
    email,
  } = props;
  const LeftContent = () => {
    return avatar_url ? (
      <Avatar.Image size={50} source={{uri: avatar_url}} />
    ) : (
      <Avatar.Text size={50} label={username[0]} />
    );
  };
  const {
    username_style,
    image_style,
    title_style,
    desc_style,
    action_view,
    date_time_style,
  } = styles;
  return (
    <Card mode="outlined">
      <Card.Cover
        source={{uri: image_uri}}
        resizeMode="cover"
        style={[image_style]}
      />
      <Card.Title
        title={username}
        titleStyle={[username_style]}
        subtitle={email}
        left={LeftContent}
      />
      <Card.Content style={[title_style]}>
        <Text variant="headlineSmall" style={{maxHeight: 80}}>
          {title}
        </Text>
        <Text variant="titleSmall" style={[desc_style]}>
          {description}
        </Text>
      </Card.Content>
      <Card.Actions style={{top: 5}}>
        <View style={[action_view]}>
          <Button
            onPress={() => props.readMoreHandle()}
            labelStyle={{fontSize: 15}}
            mode="text">
            Read More
          </Button>
          <Text variant="labelMedium" style={[date_time_style]}>
            {date_time}
          </Text>
        </View>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
  username_style: {
    fontWeight: 900,
    fontSize: 22,
    top: 5,
  },
  image_style: {
    height: 200,
  },
  title_style: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderColor: 'gray',
  },
  desc_style: {
    maxHeight: 100,
    color: 'gray',
  },
  action_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  date_time_style: {
    maxHeight: 100,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
