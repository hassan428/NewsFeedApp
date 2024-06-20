import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const CameraCompo = ({selected_image_uri}) => {
  const [image, set_image] = useState([]);

  const openCameraHandle = async () => {
    const {assets, didCancel, errorCode, errorMessage} = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: false,
    });
    console.log('assets', assets);
    console.log('didCancel', didCancel);
    console.log('errorCode', errorCode);
    console.log('errorMessage', errorMessage);
    if (assets) {
      set_image([...image, ...assets]);
    }
  };
  const openGalleryHandle = async () => {
    const {assets, didCancel, errorCode, errorMessage} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });
    console.log('assets', assets);
    console.log('didCancel', didCancel);
    console.log('errorCode', errorCode);
    console.log('errorMessage', errorMessage);
    if (assets) {
      set_image([...image, ...assets]);
    }
  };

  const {container, cell, row, button, shadow, buttonText} = styles;
  return (
    <>
      <View style={{margin: 10}}>
        <View style={[row, {justifyContent: 'space-between'}]}>
          <Text style={[buttonText, {color: 'black'}]}>All items</Text>
          <MaterialCommunityIcons
            name="checkbox-multiple-marked-outline"
            size={25}
          />
        </View>
      </View>

      <View style={[{flex: 1, backgroundColor: 'white', marginVertical: 10}]}>
        <ScrollView>
          <View style={[row]}>
            {image.length > 0 &&
              image.map(({uri}, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => selected_image_uri(uri)}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri,
                    }}
                    style={[cell]}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
        <View style={[container, row]}>
          <TouchableOpacity onPress={openCameraHandle} style={[button, shadow]}>
            <Entypo name="camera" size={20} color="#fff" />
            <Text style={buttonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openGalleryHandle}
            style={[button, shadow]}>
            <Entypo name="images" size={20} color="#fff" />
            <Text style={buttonText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
  },
  cell: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'arial',
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 100, height: 2},
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 5,
  },
});
