import React, {useEffect, useState} from 'react';
import App_navigation from './config/App_navigation/Index';
import {Splash_screen} from './Screens/Splash_screen';
import AsyncStorageCompo from './practice_component/AsyncStorageCompo';
import {DisplaySelectImage} from './practice_component/DisplaySelectImage';
import {Geo_location} from './practice_component/Geo_location';

export default App = () => {
  const [splash_screen, setSplash_screen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash_screen(false);
    }, 4000);
  }, []);

  return splash_screen ? <Splash_screen /> : <App_navigation />;

  // return (
  //   <>
  //     <Geo_location />
  //     <AsyncStorageCompo />
  //     <DisplaySelectImage />
  //   </>
  // );
};
