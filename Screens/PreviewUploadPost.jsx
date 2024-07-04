import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {News_card} from '../component/News_card';
import {useRoute} from '@react-navigation/native';
import {AppBar} from '../component/AppBar';

export const PreviewUploadPost = () => {
  const {params} = useRoute();

  const {username, title, description, url, date_time, avatar_url, email} =
    params;

  return (
    <>
      <AppBar />
      <View style={{padding: 10}}>
        <News_card
          title={title}
          description={description}
          image_uri={url}
          username={'You'}
          date_time={date_time}
          avatar_url={avatar_url}
          email={email}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
