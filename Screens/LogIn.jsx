import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
import {ActiveBtn, InActiveBtn, Submit_btn} from '../component/CustomBtn';
import {Custom_input, Password_input} from '../component/Custom_input';
import {Connect_with_icon} from '../component/Connect_with_icon';
import {Bottom_Image} from '../component/Bottom_Image';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {getErrorMessage} from '../utils/firebaseErrorMsg';
import {Logo} from '../component/Logo';

export const LogIn = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const {container, login_signup_tag} = styles;

  const navigation = useNavigation();

  const submit_handle = () => {
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 2) {
      setErrorMsg('Please fill all the fields');
    } else {
      setErrorMsg('');
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
          navigation.navigate('BottomTabs');
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
          setErrorMsg(getErrorMessage(err.code));
        });
    }
  };
  console.log(data);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={container}>
          <Logo iconSize={20} fontSize={15} />

          {/* <Heading text="LogIn" /> */}

          <HeadingText text="signing In" />

          <View style={[login_signup_tag]}>
            <InActiveBtn text={'SignUp'} navigation={navigation} />
            <ActiveBtn text={'LogIn'} />
          </View>

          <Custom_input
            keyboardType="email-address"
            placeholder="Email Address"
            id="email"
            icon={<MaterialCommunityIcons size={25} name="email-outline" />}
            inputValue={(text, id) => setData({...data, [id]: text})}
          />

          <Password_input
            inputValue={(text, id) => setData({...data, [id]: text})}
          />

          <SomeText myStyle={{color: 'red'}} text={errorMsg} />

          <Submit_btn onPress={submit_handle} text={'LogIn'} />

          <SomeText text={'Forget Password'} />

          <SomeText myStyle={{marginTop: 10}} text={'Or Connect With'} />

          <Connect_with_icon />
        </View>

        <Bottom_Image
          source={require('../assets/bottomImage.jpg')}
          text={'LogIn With Finger Print'}
          myStyleText={{color: 'white', fontWeight: 'bold'}}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    gap: 5,
  },
  login_signup_tag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    margin: 15,
  },
});
