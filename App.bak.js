import React, {useEffect, useState} from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = () => {
  const state = {
    isLoadingComplete: false,
    fontLoaded: false,
  }

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [fontLoaded, setfontLoaded] = useState(false);


  useEffect(() => {
    const [fontsAreLoaded] = useFonts({
      'open-sans-regular': require('./assets/font/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
      'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf'),
      'salt': require('./assets/font/Salt.ttf'),
      'salt-bold': require('./assets/font/Salt-Bold.ttf'),
    });
    setfontLoaded(fontsAreLoaded);
  }, []);

  const _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  const _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    if(fontLoaded) {
      setIsLoadingComplete(true);
    }
  };

  // const componentDidMount = async () => {
  //   const [fontsLoaded] = useFonts({
  //     'open-sans-regular': require('./assets/font/OpenSans-Regular.ttf'),
  //     'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
  //     'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf'),
  //     'salt': require('./assets/font/Salt.ttf'),
  //     'salt-bold': require('./assets/font/Salt-Bold.ttf'),
  //   });
  //
  //
  //   // this.setState({ fontLoaded: true });
  // }
  
    if(!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={_loadResourcesAsync}
          onError={_handleLoadingError}
          onFinish={_handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={argonTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
}

export default App;