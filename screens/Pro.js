import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import { Images, argonTheme } from "../constants/";
import { HeaderHeight } from "../constants/utils";

export default class Pro extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex >
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height + 50, width, zIndex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}
          />
          <Block middle center style={{ ...styles.padded, height: '80%', zIndex: 2 }}>
              <Text style={{ fontFamily: 'salt', fontSize: 34, textAlign: 'center', fontWeight: '200' }} color="black" size={60}>Bold Gospel Alive</Text>
          </Block>

            <Block middle style={{paddingBottom: 32, zIndex: 3}}>
              <Button
                  shadowless
                  style={styles.button}
                  color={argonTheme.COLORS.INFO}
                  onPress={() => navigation.navigate("App")}>
                <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '2600' }} color="white" size={60}>Get Started</Text>
              </Button>
            </Block>
            {/*    <Text style={{ fontFamily: 'open-sans-bold', fontSize: 14 }} color={theme.COLORS.WHITE}>*/}
            {/*      GET STARTED*/}
            {/*    </Text>*/}

            {/*  </Button>*/}
            {/*</Block>*/}
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0
  },
  center: {
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: "absolute",
    bottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
