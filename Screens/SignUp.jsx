import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SomeText} from '../component/Text_component';
import {Submit_btn, Swith_screen} from '../component/CustomBtn';
import {Custom_input, Password_input} from '../component/Custom_input';
import {Connect_with_icon} from '../component/Connect_with_icon';
import {Custom_image} from '../component/Custom_image';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {errorMessages} from '../utils/firebaseErrorMsg';
import {Logo} from '../component/Logo';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';

export const SignUp = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading_btn, set_loading_btn] = useState(false);
  const navigation = useNavigation();

  const localUrlPatterns = [
    /^content:\/\//, // Android
    /^file:\/\//, // Android & iOS
    /^assets-library:\/\//, // iOS
  ];

  const globalUrlPattern = /^https?:\/\//; // Web

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
      setData({...data, avatar_url: assets[0].uri});
    }
  };

  const uploadImageToStorage = async uri => {
    try {
      const imageRef = storage().ref(`avatar/${uuid.v4()}`);
      const task = await imageRef.putFile(uri);
      // console.log('imageRef', imageRef);
      // console.log('task', task);
      const url = await imageRef.getDownloadURL();
      // console.log('url', url);
      authenticate_handle({...data, avatar_url: url});
    } catch (error) {
      console.log('error', error);
      set_loading_btn(false);
    }
    // console.log('data', data);
  };

  const uploadDataToRealTime = async profileData => {
    try {
      const reference = database().ref(`users/${profileData.uid}/profile/`);
      await reference.set(profileData);
      console.log('Profile Data successfully Saved');
      navigation.navigate('News Feed');
      set_loading_btn(false);
    } catch (error) {
      console.log('Error uploading post:', error);
      set_loading_btn(false);
    }
  };

  const submit_handle = () => {
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 4) {
      setErrorMsg('Please fill all the fields');
    } else if (
      localUrlPatterns.some(pattern => pattern.test(data.avatar_url))
    ) {
      uploadImageToStorage(data.avatar_url);
      set_loading_btn(true);
    } else if (globalUrlPattern.test(data.avatar_url)) {
      set_loading_btn(true);
      authenticate_handle();
    } else {
      setErrorMsg('Unknown URL type');
    }
  };
  // console.log(data);
  const authenticate_handle = finalData => {
    setErrorMsg('');
    auth()
      .createUserWithEmailAndPassword(finalData.email, finalData.password)
      .then(({user, additionalUserInfo}) => {
        const {uid} = user;
        // console.log('user', user);
        // AsyncStorage.setItem('uid', uid);
        uploadDataToRealTime({...finalData, uid});

        navigation.navigate('BottomTabs');
        // navigation.setOptions(user);
      })
      .catch(err => {
        set_loading_btn(false);
        console.log('err', err.code);
        setErrorMsg(errorMessages[err.code]);
      });

    // console.log(data);
  };

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({...data, [id]: text});
    set_loading_btn(false);
  };

  const {container, scroll_view, image_btn} = styles;
  console.log('errorMsg', errorMsg);
  return (
    <ScrollView style={[scroll_view]}>
      <Custom_image source={require('../assets/bottomImage.png')} />

      <View style={[container]}>
        <Logo iconSize={25} fontSize={15} />

        {/* <Heading text="SignUp" /> */}

        {/* <HeadingText text="SignUp" /> */}

        <Swith_screen
          value={'SignUp'}
          buttons={[
            {
              value: 'LogIn',
              label: 'LogIn',
              style: {backgroundColor: 'white'},
            },
            {
              value: 'SignUp',
              label: 'SignUp',
              checkedColor: '#4c5ca2',
              style: {backgroundColor: '#fec549'},
              icon: 'check',
            },
          ]}
        />

        <Submit_btn
          text={'Browse Avatar'}
          icon={'image'}
          myStyle={image_btn}
          myLabelStyle={{paddingVertical: 10}}
          onPress={openGalleryHandle}
        />
        <Custom_input
          keyboardType="url"
          label="Avatar URL"
          placeholder="https://"
          id="avatar_url"
          value={data.avatar_url}
          icon={'image-filter-drama'}
          inputValue={inputValue}
        />

        <Custom_input
          keyboardType="default"
          label="Username"
          placeholder="Username"
          id="username"
          value={data.username}
          icon={'account-outline'}
          inputValue={inputValue}
        />

        <Custom_input
          keyboardType="email-address"
          label="Email Address"
          placeholder="Email Address"
          id="email"
          value={data.email}
          icon={'email-outline'}
          inputValue={inputValue}
        />

        <Password_input inputValue={inputValue} value={data.password} />

        <SomeText myStyle={{color: 'red'}} text={errorMsg} />

        <Submit_btn
          loading={loading_btn}
          disabled={loading_btn}
          onPress={submit_handle}
          text={'SignUp'}
        />

        <SomeText text={'Or Connect With'} />

        <Connect_with_icon />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 8,
  },
  image_btn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 0,
    fontSize: 40,
  },
});
