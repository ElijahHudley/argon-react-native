import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Platform,
    View,
    StatusBar
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    ResizeMode,
    Video
} from "expo-av";

import { Icon } from "../../components";
import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import { iPhoneX, HeaderHeight } from "../../constants/utils";

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import Controls from './Controls';
import Seekbar from "./Seekbar";

const { height, width } = Dimensions.get("window");

class PlaylistItem {
    constructor(name, uri, isVideo) {
        this.name = name;
        this.uri = uri;
        this.isVideo = isVideo;
    }
}

const PLAYLIST = [
    new PlaylistItem(
        "Comfort Fit - “Sorry”",
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
        false
    ),
    new PlaylistItem(
        "Big Buck Bunny",
        "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        true
    ),
    new PlaylistItem(
        "Mildred Bailey – “All Of Me”",
        "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
        false
    ),
    new PlaylistItem(
        "Popeye - I don't scare",
        "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        true
    ),
    new PlaylistItem(
        "Podington Bear - “Rubber Robot”",
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
        false
    )
]


export default class Player extends React.Component {

    state = {
        sound: null,
        isPlaying: false,
        repeat: false
    }

    async controlPlayer() {
        if(this.state.isPlaying) {
            await this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        if(this.state.sound == null) {
            await this.loadSound();
        }

        if(this.state.sound) {
            console.log('Playing Sound', this.state.sound, 'status');
            await this.state.sound.playAsync();
            this.setState({isPlaying: true });
        }
    }

    async pause() {
        console.log('pause this.state', this.state);
        if(this.state.sound !== null) {
            this.state.sound.pauseAsync().catch(err => {
                console.log("Unload warning: " + err);
            });
            this.setState({isPlaying: false });
        }
    }

    async repeat() {
        console.log('pause this.state', this.state);
        if(this.state.sound !== null) {
            this.setState({repeat: !this.state.repeat });
        }
    }

    async stop() {
        console.log('stop this.state', this.state);
        if(this.state && this.state.sound !== null) {
            this.state.sound.unloadAsync().catch(err => {
                console.log("Unload warning: " + err)
            });
            this.setState({isPlaying: false });
        }
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }
    }

    async _onPlaybackStatusUpdate(status) {
        //console.log('_onPlaybackStatusUpdate', status);
    }

    async loadSound() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false
        });
        await this._loadNewPlaybackInstance(true);

        // const source = require('../../assets/music/song.mp3');
        const source = {uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3'}
        const initialStatus = {
            shouldPlay: true,
            shouldCorrectPitch: false,
            volume: 1.0,
            isMuted: false,
            // isLooping: this.state.loopingType === LOOPING_TYPE_ONE
            // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
            androidImplementation: 'MediaPlayer',
        };
        const {sound, status} = await Audio.Sound.createAsync(source,
            initialStatus,
            this._onPlaybackStatusUpdate);
        this.setState({sound: sound, isPlaying: true });
    }

    async componentDidMount() {
        console.log('Loading Sound');
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                    <Block middle style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                        <Image
                            style={{ width: 103, height: 222 }}
                            source={Images.Player.ShadePrevious}
                        />
                        <Image
                            style={{ width: 230, height: 230, margin: -30 }}
                            source={Images.Player.Cover}
                        /><Image
                        style={{ width: 103, height: 222 }}
                        source={Images.Player.ShadeNext}
                    />
                    </Block>


                    <Block middle style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                        <Button
                            shadowless
                            style={styles.button}
                            // color={argonTheme.COLORS.INFO}
                            onPress={this.controlPlayer.bind(this)}>
                            <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '2600' }} color="white" size={60}>Repeat</Text>
                        </Button>

                        <Button
                            shadowless
                            style={styles.button}
                            // color={argonTheme.COLORS.INFO}
                            onPress={this.controlPlayer.bind(this)}>
                            <Image
                                style={styles.playBtn}
                                source={this.state.isPlaying ? Images.Player.PauseBtn : Images.Player.PlayBtn}
                            />
                        </Button>

                        <Button
                            shadowless
                            style={styles.button}
                            // color={argonTheme.COLORS.INFO}
                            onPress={this.repeat.bind(this)}>
                            <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '2600' }} color="white" size={60}>Stop</Text>
                            <Image style={styles.productImage} source={Images.Player.RepeatBtn}
                            />
                        </Button>
                    </Block>
                </Block>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    audioElement: {
        height: 0,
        width: 0,
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'red',
        shadowColor: 'transparent',
        color: 'white',
        width: '30%',
        height: '20%'
    },
    playBtn: {
        width: 90,
        height: 90
    }
};