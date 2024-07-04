import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
import {Swith_screen, Submit_btn} from '../component/CustomBtn';
import {Custom_input, Password_input} from '../component/Custom_input';
import {Connect_with_icon} from '../component/Connect_with_icon';
import {Custom_image} from '../component/Custom_image';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {errorMessages, getErrorMessage} from '../utils/firebaseErrorMsg';
import {Logo} from '../component/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogIn = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [loading_btn, set_loading_btn] = useState(false);
  const navigation = useNavigation();

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    set_loading_btn(false);
    setData({...data, [id]: text});
  };

  const submit_handle = () => {
    set_loading_btn(true);
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 2) {
      setErrorMsg('Please fill all the fields');
      set_loading_btn(false);
    } else {
      setErrorMsg('');
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(({user, additionalUserInfo}) => {
          const {email, uid} = user;
          // console.log('user', user);
          // AsyncStorage.setItem('uid', uid);
          navigation.navigate('BottomTabs');
          // navigation.setOptions(user);
        })
        .catch(err => {
          console.log('err', err.code);
          setErrorMsg(errorMessages[err.code]);
          set_loading_btn(false);
        });
    }
  };
  // console.log(data);
  const {container, scroll_view} = styles;

  return (
    <>
      <ScrollView style={[scroll_view]}>
        <Custom_image source={require('../assets/bottomImage.png')} />
        <View style={container}>
          <Logo iconSize={25} fontSize={15} />

          {/* <Heading text="LogIn" /> */}

          {/* <HeadingText text="Log In" /> */}

          <Swith_screen
            value={'LogIn'}
            buttons={[
              {
                value: 'LogIn',
                label: 'LogIn',
                checkedColor: '#4c5ca2',
                style: {backgroundColor: '#fec549'},
                icon: 'check',
              },
              {
                value: 'SignUp',
                label: 'SignUp',
                style: {backgroundColor: 'white'},
              },
            ]}
          />

          <Custom_input
            keyboardType="email-address"
            placeholder="Email Address"
            label="Email Address"
            id="email"
            value={data.email}
            icon={'email-outline'}
            inputValue={inputValue}
          />

          <Password_input inputValue={inputValue} value={data.password} />

          <SomeText text={'Forget Password'} myStyle={{textAlign: 'right'}} />

          <SomeText myStyle={{color: 'red'}} text={errorMsg} />

          <Submit_btn
            loading={loading_btn}
            disabled={loading_btn}
            onPress={submit_handle}
            text={'LogIn'}
          />

          <SomeText myStyle={{marginTop: 10}} text={'Or Connect With'} />

          <Connect_with_icon />
        </View>
      </ScrollView>
    </>
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
    gap: 10,
  },
});
