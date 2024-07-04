import React, {useEffect, useState} from 'react';
import {SignUp} from '../../Screens/SignUp';
import {LogIn} from '../../Screens/LogIn';
import {BottomTabs} from '../../Screens/BottomTabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Splash_screen} from '../../Screens/Splash_screen';
import {useDispatch, useSelector} from 'react-redux';
import {auth_Check} from '../../store/slices/auth_slice';
import {PreviewUploadPost} from '../../Screens/PreviewUploadPost';
import {News_feed_details} from '../../Screens/News_feed_details';
import {Loading} from '../../component/Loading';

const App_navigation = () => {
  const [splash_screen, setSplash_screen] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('LogIn');
  const {islogged, loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        const {uid} = user;
        dispatch(auth_Check({uid, islogged: true, loading: false}));
        setInitialRouteName('BottomTabs');
      } else {
        dispatch(auth_Check({loading: false}));
      }
      setTimeout(() => {
        setSplash_screen(false);
      }, 3000);
    });
  }, []);
  const Stack = createNativeStackNavigator();
  const stackScreenArray = islogged
    ? [
        {name: 'BottomTabs', component: BottomTabs},
        {name: 'PreviewUploadPost', component: PreviewUploadPost},
        {name: 'News_feed_details', component: News_feed_details},
      ]
    : [
        {name: 'LogIn', component: LogIn},
        {name: 'SignUp', component: SignUp},
      ];

  return splash_screen ? (
    <Splash_screen />
  ) : loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        {stackScreenArray.map(({name, component}, i) => (
          <Stack.Screen name={name} component={component} key={i} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_navigation;
