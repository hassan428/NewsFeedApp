import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {Submit_btn} from '../component/CustomBtn';
import {launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {Alert_dialog} from '../component/Alert_dialog';
import {AppBar} from '../component/AppBar';
import {Button} from 'react-native-paper';

export const Post_news_feed = () => {
  const {uid, profile} = useSelector(store => store.auth);
  const [loading_btn, set_loading_btn] = useState(false);
  const [showAlert, setShowAlert] = useState({});
  const {navigate} = useNavigation();

  const [data, setData] = useState({
    title: 'Title',
    description: 'Description',
    url: 'https://',
  });
  const localUrlPatterns = [
    /^content:\/\//, // Android
    /^file:\/\//, // Android & iOS
    /^assets-library:\/\//, // iOS
  ];

  const globalUrlPattern = /^https?:\/\//;

  const getDateHandle = () => {
    const currentDate = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    const dateString = currentDate.toLocaleDateString('en-US', options);
    return dateString;
  };

  const openGalleryHandle = async () => {
    const {assets, didCancel, errorCode, errorMessage} =
      await launchImageLibrary({
        mediaType: 'photo',
      });
    if (didCancel) {
      console.log('User did not select an image.');
    } else if (errorCode) {
      console.log('error: ', errorCode, errorMessage);
    } else {
      setData({...data, url: assets[0].uri});
    }
  };

  const uploadImageToStorage = async uri => {
    try {
      const imageRef = storage().ref(`images/${uuid.v4()}`);
      const task = await imageRef.putFile(uri);
      // console.log('imageRef', imageRef);
      // console.log('task', task);
      const url = await imageRef.getDownloadURL();
      // console.log('url', url);
      uploadPostToRealTime({...data, url});
    } catch (error) {
      console.log('error', error);
      set_loading_btn(false);
    }
    // console.log('data', data);
  };

  const uploadPostToRealTime = async postData => {
    try {
      const postId = uuid.v4();
      const reference = database().ref(`users/${uid}/posts/${postId}`);
      await reference.set({
        ...postData,
        id: postId,
        date_time: getDateHandle(),
      });
      console.log('Post successfully uploaded');
      navigate('News Feed');
      set_loading_btn(false);
      setData({title: 'Title', description: 'Description', url: 'https://'});
    } catch (error) {
      console.log('Error uploading post:', error);
      set_loading_btn(false);
    }
  };

  const sendPostHandle = () => {
    if (localUrlPatterns.some(pattern => pattern.test(data.url))) {
      uploadImageToStorage(data.url);
      set_loading_btn(true);
    } else if (globalUrlPattern.test(data.url)) {
      set_loading_btn(true);
      uploadPostToRealTime(data);
    } else {
      setShowAlert({show: true, text: 'Unknown URL type', title: 'URL'});
    }
  };
  // console.log('profile', profile);
  const preview_post_handle = () => {
    navigate('PreviewUploadPost', {
      ...data,
      date_time: getDateHandle(),
      ...profile,
    });
  };

  // console.log(data);
  const {image_btn, scroll_view_content, container} = styles;
  return (
    <>
      <AppBar />
      <ScrollView
        style={[container]}
        contentContainerStyle={[scroll_view_content]}>
        {showAlert.show && (
          <Alert_dialog
            showAlert={showAlert.show}
            text={showAlert.text}
            title={showAlert.title}
            btn={<Button onPress={() => setShowAlert({})}>Ok</Button>}
            hideDialog={() => setShowAlert({})}
          />
        )}

        <View style={{width: '100%'}}>
          <Submit_btn
            text={'Browse Image'}
            icon={'image'}
            myStyle={image_btn}
            myLabelStyle={{paddingVertical: 20}}
            onPress={openGalleryHandle}
          />
          <Text style={{textAlign: 'center', fontSize: 20}}>OR</Text>

          <Custom_input
            inputValue={(text, id) => setData({...data, [id]: text})}
            label="Image URL"
            id="url"
            value={data.url}
            // keyboardType="url"
          />
        </View>

        <Custom_input
          inputValue={(text, id) => setData({...data, [id]: text})}
          label="Title"
          id="title"
          value={data.title}
        />
        <Custom_input
          inputValue={(text, id) => setData({...data, [id]: text})}
          label="Description"
          id="description"
          value={data.description}
          multiline={true}
        />
        <Submit_btn text={'Preview Post'} onPress={preview_post_handle} />
        <Submit_btn
          text={'Upload'}
          icon={'cloud-upload'}
          loading={loading_btn}
          disabled={loading_btn}
          onPress={sendPostHandle}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll_view_content: {
    padding: 10,
    gap: 20,
  },
  container: {backgroundColor: 'white'},
  image_btn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 0,
    fontSize: 40,
  },
});
