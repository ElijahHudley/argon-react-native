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
import source from "../../assets/music/song.mp3";

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
        isPlaying: false
    }
    async controlPlayer() {
        if(this.state.isPlaying) {
            await this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        // const {sound} = await Audio.Sound.createAsync(require('../../assets/music/song.mp3'));
        // this.setState({sound: sound});
        // console.log('Playing Sound', sound);
        // await sound.playAsync();
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
                <TouchableOpacity
                    style={styles.button}
                    underlayColor={argonTheme.COLORS.PRICE_COLOR}
                    onPress={this.controlPlayer.bind(this)}
                >
                    <Text style={{ fontFamily: 'open-sans-regular' }} color={'white'}>{'label'}</Text>
                </TouchableOpacity>
                </Block>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },
    audioElement: {
        height: 0,
        width: 0,
    },
    button: {
        color: 'white',
        backgroundColor: 'blue',
        width: '100%',
        height: '100%'
    }
};