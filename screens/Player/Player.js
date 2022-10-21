import React from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Platform,
    View,
    StatusBar
} from "react-native";

import { Block, Text, Button, theme } from "galio-framework";
import { Video } from 'expo-av';

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

export const TRACKS = [
    {
        title: 'Stressed Out',
        artist: 'Twenty One Pilots',
        albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
        audioUrl: require('../../assets/music/11sec-Xylocopa_Isaac_Joel_instrumental_LOSSLESS.wav'),
    },
    {
        title: 'Love Yourself',
        artist: 'Justin Bieber',
        albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
        audioUrl: 'http://srv2.dnupload.com/Music/Album/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20(320)/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20128/05%20Love%20Yourself.mp3',
    },
    {
        title: 'Hotline Bling',
        artist: 'Drake',
        albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
        audioUrl: 'http://dl2.shirazsong.org/dl/music/94-10/CD%201%20-%20Best%20of%202015%20-%20Top%20Downloads/03.%20Drake%20-%20Hotline%20Bling%20.mp3',
    },
];

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paused: false,
            totalLength: 1,
            currentPosition: 0,
            selectedTrack: 0,
            repeatOn: false,
            shuffleOn: false,
        };
    }

    setDuration(data) {
        // console.log(totalLength);
        this.setState({totalLength: Math.floor(data.duration)});
    }

    setTime(data) {
        //console.log(data);
        this.setState({currentPosition: Math.floor(data.currentTime)});
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }


    loadStart(ready) {
        console.log('loadStart', ready);
    }

    onBack() {
        if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                paused: false,
                totalLength: 1,
                isChanging: false,
                selectedTrack: this.state.selectedTrack - 1,
            }), 0);
        } else {
            this.refs.audioElement.seek(0);
            this.setState({
                currentPosition: 0,
            });
        }
    }

    onForward() {
        if (this.state.selectedTrack < TRACKS.length - 1) {
            this.refs.audioElement && this.refs.audioElement.seek(0);
            this.setState({ isChanging: true });
            setTimeout(() => this.setState({
                currentPosition: 0,
                totalLength: 1,
                paused: false,
                isChanging: false,
                selectedTrack: this.state.selectedTrack + 1,
            }), 0);
        }
    }



    render() {
        const track = TRACKS[this.state.selectedTrack];
        console.log('track', track);
        const video = (
            <Video source={{uri: '../../assets/music/11sec-Xylocopa_Isaac_Joel_instrumental_LOSSLESS.wav'}} // Can be a URL or a local file.
                   ref="audioElement"
                   paused={this.state.paused}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={true}                // Repeat forever.
                   onLoadStart={(r) => {console.log('ready', r)}} // Callback when video starts to load
                   onLoad={this.setDuration.bind(this)}    // Callback when video loads
                   onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
                   onEnd={this.onEnd}           // Callback when playback finishes
                   onError={this.videoError}    // Callback when video cannot be loaded
                   style={styles.audioElement} />
        );

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {/*<Header message="Playing From Charts" />*/}
                {/*<AlbumArt url={track.albumArtUrl} />*/}
                {/*<TrackDetails title={track.title} artist={track.artist} />*/}
                {/*<Seekbar*/}
                {/*    onSeek={this.seek.bind(this)}*/}
                {/*    trackLength={this.state.totalLength}*/}
                {/*    onSlidingStart={() => this.setState({paused: true})}*/}
                {/*    currentPosition={this.state.currentPosition} />*/}
                {/*<Controls*/}
                {/*    onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}*/}
                {/*    repeatOn={this.state.repeatOn}*/}
                {/*    shuffleOn={this.state.shuffleOn}*/}
                {/*    forwardDisabled={this.state.selectedTrack === TRACKS.length - 1}*/}
                {/*    onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}*/}
                {/*    onPressPlay={() => this.setState({paused: false})}*/}
                {/*    onPressPause={() => this.setState({paused: true})}*/}
                {/*    onBack={this.onBack.bind(this)}*/}
                {/*    onForward={this.onForward.bind(this)}*/}
                {/*    paused={this.state.paused}/>*/}
                {video}
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
    }
};