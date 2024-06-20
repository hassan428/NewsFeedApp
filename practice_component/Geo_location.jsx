import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';

export const Geo_location = () => {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 10, // Only update if moved more than 10 meters
      },
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Access',
          message:
            'We need your location to provide you with personalized experiences and better service. Your location helps us show nearby places, relevant ads, and accurate weather updates.',
          buttonNeutral: 'Ask me Later',
          buttonNegative: 'No, Thanks',
          buttonPositive: 'Yes, Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const get_location_handle = async () => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }

    //   Continuesly Watched Location
    // const watchId = Geolocation.watchPosition(
    //   position => {
    //     console.log('position', position);
    //   },
    //   error => {
    //     console.log(error.code, error.message);
    //   },
    // {enableHighAccuracy: true}, // Note: Battery Consumption for GPS if false Wifi or Mobile Data or bluetooth Access location
    // );
    // console.log('watchId', watchId);

    // stop Watch location
    // Geolocation.clearWatch(watchId);

    // stop Watch all user location

    // Geolocation.stopObserving();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
      }}>
      <TouchableOpacity onPress={get_location_handle}>
        <Text style={{fontFamily: 'arial'}}>Get Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
