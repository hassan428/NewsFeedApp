import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
import {ActiveBtn, InActiveBtn, Submit_btn} from '../component/CustomBtn';
import {Custom_input, Password_input} from '../component/Custom_input';
import {Connect_with_icon} from '../component/Connect_with_icon';
import {Bottom_Image} from '../component/Bottom_Image';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {getErrorMessage} from '../utils/firebaseErrorMsg';
import {Logo} from '../component/Logo';

export const SignUp = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const {container, login_signup_tag} = styles;
  const navigation = useNavigation();

  const submit_handle = () => {
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 3) {
      setErrorMsg('Please fill all the fields');
    } else {
      setErrorMsg('');
      auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(({user, additionalUserInfo}) => {
          console.log('user', user);
          navigation.navigate('BottomTabs');
        })
        .catch(err => {
          console.log('err', err);
          setErrorMsg(getErrorMessage(err.code));
        });
    }
    console.log(data);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={container}>
        <Logo iconSize={20} fontSize={15} />

        {/* <Heading text="SignUp" /> */}

        <HeadingText text="signing Up" />

        <View style={[login_signup_tag]}>
          <ActiveBtn text={'SignUp'} />
          <InActiveBtn text={'LogIn'} navigation={navigation} />
        </View>

        <Custom_input
          placeholder="Username"
          myStyle={{marginVertical: 12}}
          id="username"
          icon={<Feather size={25} name="user" />}
          inputValue={(text, id) => setData({...data, [id]: text})}
        />

        <Custom_input
          keyboardType="email-address"
          placeholder="Email Address"
          id="email"
          icon={<MaterialCommunityIcons size={25} name="email-outline" />}
          myStyle={{marginVertical: 12}}
          inputValue={(text, id) => setData({...data, [id]: text})}
        />

        <Password_input
          inputValue={(text, id) => setData({...data, [id]: text})}
          myStyle={{marginVertical: 12}}
        />

        <SomeText myStyle={{color: 'red'}} text={errorMsg} />

        <Submit_btn onPress={submit_handle} text={'SignUp'} />

        <SomeText myStyle={{marginTop: 10}} text={'Or Connect With'} />

        <Connect_with_icon />
      </View>

      <Bottom_Image
        source={require('../assets/bottomImage.jpg')}
        text={'SignUp With Finger Print'}
        // myStyle={{height: 190}}
        myStyleText={{color: 'white', fontWeight: 'bold'}}
      />
    </ScrollView>
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
