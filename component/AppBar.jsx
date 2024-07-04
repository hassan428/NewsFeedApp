import * as React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {Logo} from './Logo';
import auth from '@react-native-firebase/auth';
import {Alert_dialog} from './Alert_dialog';
import {View} from 'react-native';
import {auth_Check} from '../store/slices/auth_slice';
import {useDispatch} from 'react-redux';

export const AppBar = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <Appbar.Header
      style={{justifyContent: 'space-between'}}
      mode="center-aligned">
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title={<Logo iconSize={20} fontSize={20} />} />
      <Alert_dialog
        showAlert={showAlert}
        text={'Are you sure you want to logOut?'}
        title={'LogOut'}
        btn={
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button onPress={() => setShowAlert(false)}>No, stayed</Button>

            <Button
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => {
                    dispatch(auth_Check({islogged: false, loading: true}));

                    setShowAlert(false);
                  });
              }}>
              Yes, LogOut
            </Button>
          </View>
        }
        hideDialog={() => setShowAlert(false)}
      />
      <Appbar.Action icon="logout" onPress={() => setShowAlert(true)} />
    </Appbar.Header>
  );
};
