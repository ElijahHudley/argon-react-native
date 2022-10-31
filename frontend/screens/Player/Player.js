import React from "react";
import {
    Dimensions,
    Image,
    View,
    StatusBar
} from "react-native";

import { Block, Text, Button } from "galio-framework";

import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
} from "expo-av";

import Slider from '@react-native-community/slider';

import argonTheme from "../../constants/Theme";
import Images from "../../constants/Images";
import { iPhoneX, HeaderHeight } from "../../constants/utils";
const { height, width } = Dimensions.get("window");

const PLAYLIST = [
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
        "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
        "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
]


export default class Player extends React.Component {

    state = {
        sound: null,
        isPlaying: false,
        isLooping: false,
    }

    sound = React.createRef();
    update = React.createRef();

    async controlPlayer() {
        if(this.state.isPlaying) {
            await this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        if(this.sound.current === null) {
            await this.loadSound();
        }

        if(this.sound.current) {
            console.log('Playing Sound', this.sound, 'status');
            await this.sound.current.playAsync().then(function(data) {
                console.log('data', data);
            });
        }
    }

    async pause() {
        console.log('pause this.state', this.state);
        if(this.sound.current !== null) {
            this.sound.current.pauseAsync().catch(err => {
                console.log("Unload warning: " + err);
            });
            this.setState({isPlaying: false });
        }
    }

    async repeat() {
        console.log('pause this.state', this.state);
        if(this.sound !== null) {
            this.setState({repeat: !this.state.isLooping });
        }
    }

    async stop() {
        console.log('stop this.state', this.state);
        if(this.sound.current !== null) {
            this.sound.current.unloadAsync().catch(err => {
                console.log("Unload warning: " + err)
            });
            this.sound = React.createRef();
            this.setState({isPlaying: false });
        }
    }

    async _loadNewPlaybackInstance() {
        if(this.sound.current !== null) {
            await this.sound.current.unloadAsync();
            this.setState({ sound: null });
        }
    }

    _onPlaybackStatusUpdate(playbackStatus) {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state
            this.update.current = playbackStatus;

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                console.log('_onPlaybackStatusUpdate', playbackStatus);
                this.setState({ isPlaying: playbackStatus.isPlaying });

            } else {
                // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
            }
        }
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

        // await this._loadNewPlaybackInstance();

        // const source = require('../../assets/music/song.mp3');
        const source = {uri: PLAYLIST}
        const initialStatus = {
            shouldPlay: true,
            shouldCorrectPitch: false,
            volume: 1.0,
            isMuted: false,
            isLooping: this.state.isLooping,
            // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
            // androidImplementation: 'MediaPlayer',
        };

        try {
            const {sound, status} = await Audio.Sound.createAsync(
                source,
                initialStatus,
                this._onPlaybackStatusUpdate.bind(this));
            this.update.current = status;
            this.sound.current = sound;
            await this.sound.current.setProgressUpdateIntervalAsync(1000);
            // await this.sound.current.setPositionAsync(0);
            // this.setState({sound: sound, isPlaying: true });
        } catch (e) {
            console.log('error', e);
        }
    }

    msToTime(s) {
        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return String(pad(hrs) + ':' + pad(mins) + ':' + pad(secs));
    }

    async sliderUpdate(status) {
        console.log('sliderUpdate status', status);
        await this.sound.current.setPositionAsync(status);
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
                    <Block  style={styles.textContainer}>
                        <Text bold size={30} color={'#222222'} style={styles.title}> {'TITLE'} </Text>
                        <Text muted size={13} style={styles.subTitle}> {'subtitle'} </Text>
                    </Block>

                    <Block middle style={styles.artContainer}>
                        <Image
                            style={{ width: 103, height: 222 }}
                            source={Images.Player.ShadePrevious}
                        />
                        <Image
                            style={{ width: 230, height: 230, margin: -30 }}
                            source={Images.Player.Cover}
                        />
                        <Image
                            style={{ width: 103, height: 222 }}
                            source={Images.Player.ShadeNext}
                        />
                    </Block>
                    <Block middle style={styles.durationContainer}>
                        <Text muted size={13} style={styles.subTitle}> {this.msToTime(this.update.current?.positionMillis || 0)} {'|'}</Text>
                        <Text muted size={13} style={styles.subTitle}> {this.msToTime(this.update.current?.playableDurationMillis || 0)} </Text>
                    </Block>
                    <Block middle style={styles.sliderContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={this.update.current ? this.update.current?.playableDurationMillis : 0}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            value={this.update.current ? this.update.current?.positionMillis : 0}
                            onValueChange={this.sliderUpdate.bind(this)}
                            tapToSeek
                        />
                    </Block>

                    <Block middle style={styles.buttonContainer}>
                        <Button
                            shadowless
                            style={styles.button}
                            onPress={this.controlPlayer.bind(this)}>
                            <Image resizeMode={'contain'} style={styles.sideButtonsShuffle} source={Images.Player.ShuffleBtn} />
                        </Button>

                        <Button
                            shadowless
                            style={styles.button}
                            onPress={this.controlPlayer.bind(this)}>
                            <Image resizeMode={'contain'} style={styles.playBtn} source={this.state.isPlaying ? Images.Player.PauseBtn : Images.Player.PlayBtn} />
                        </Button>

                        <Button
                            shadowless
                            style={styles.button}
                            onPress={this.repeat.bind(this)}>
                            <Image resizeMode={'contain'} style={styles.sideButtonsRepeat} source={Images.Player.RepeatBtn} />
                        </Button>
                    </Block>

                    <Block middle style={styles.transcribeContainer}>
                        <Block style={styles.transcribe}>
                            <Button
                                shadowless
                                style={styles.button}
                                onPress={this.repeat.bind(this)}>
                                <Text bold style={styles.transcribeText} color="black" size={22}>{'Transcription'}</Text>
                                <Image resizeMode={'contain'} style={styles.transcribeArrow} source={Images.Player.transcribeArrow} />
                            </Button>
                        </Block>
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
    textContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 90
    },
    title: {
        fontStyle: 'normal',
        lineHeight: 40,
        letterSpacing: -1,
        color: '#222222'
    },

    subTitle: {
        lineHeight: 13,
        letterSpacing: 2.70833,
        textTransform: 'uppercase'
    },
    artContainer: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        marginTop: -80
    },
    durationContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        marginTop: -100
    },
    sliderContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        marginTop: -50
    },
    slider: {
        width: 320,
        height: 40,
    },
    audioElement: {
        height: 0,
        width: 0,
    },
    buttonContainer: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        marginTop: -50
    },
    button: {
        backgroundColor: 'transparent',
        color: 'white',
        width: '30%',
        height: '20%'
    },
    playBtn: {
        width: 130,
        height: 130
    },
    sideButtonsRepeat: {
        width: '60%',
        height: '50%',
        marginRight: 10,
        marginTop: -20
    },
    sideButtonsShuffle: {
        width: '60%',
        height: '50%',
        marginTop: -20
    },
    transcribeContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    transcribe: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    transcribeArrow: {
        height: '300%',
        width: '100%',
        marginTop: -10
    },
    transcribeText: {
        height: '100%',
        width: '120%',
        textAlign: 'center',
        marginTop: 10
    }
};