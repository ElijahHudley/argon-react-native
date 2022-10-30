import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
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

class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false,
  }

  async componentDidMount() {
    const fontsLoaded = await Font.loadAsync({
      'open-sans-regular': require('./assets/font/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/font/OpenSans-Light.ttf'),
      'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf'),
      'salt': require('./assets/font/Salt.ttf'),
      'salt-bold': require('./assets/font/Salt-Bold.ttf'),
    }).then(() => { 
      return true;
    });
    console.log('fontsLoaded', fontsLoaded);
    this.setState({ fontLoaded: fontsLoaded });
  }

  render() {
    if(!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
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

  _loadResourcesAsync = async () => {
    console.log('_loadResourcesAsync');
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.log('_handleLoadingError');
    console.warn(error);
  };

  _handleFinishLoading = () => {
    console.log('_handleFinishLoading');
    if(this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };

}

export default App;