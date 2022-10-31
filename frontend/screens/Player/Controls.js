import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

const Controls = ({
                      paused,
                      shuffleOn,
                      repeatOn,
                      onPressPlay,
                      onPressPause,
                      onBack,
                      onForward,
                      onPressShuffle,
                      onPressRepeat,
                      forwardDisabled,
                  }) => (
    <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
            <Image style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
                   source={require('../../assets/imgs/player/shuffle_FILL0_wght400_GRAD0_opsz48.png')}/>
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity onPress={onBack}>
            <Image source={require('../../assets/imgs/player/skip_previous_FILL0_wght400_GRAD0_opsz48.png')}/>
        </TouchableOpacity>
        <View style={{width: 20}} />
        {!paused ?
            <TouchableOpacity onPress={onPressPause}>
                <View style={styles.playButton}>
                    <Image source={require('../../assets/imgs/player/pause_FILL0_wght400_GRAD0_opsz48.png')}/>
                </View>
            </TouchableOpacity> :
            <TouchableOpacity onPress={onPressPlay}>
                <View style={styles.playButton}>
                    <Image source={require('../../assets/imgs/player/play_arrow_FILL0_wght400_GRAD0_opsz48.png')}/>
                </View>
            </TouchableOpacity>
        }
        <View style={{width: 20}} />
        <TouchableOpacity onPress={onForward}
                          disabled={forwardDisabled}>
            <Image style={[forwardDisabled && {opacity: 0.3}]}
                   source={require('../../assets/imgs/player/skip_next_FILL0_wght400_GRAD0_opsz48.png')}/>
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
            <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
                   source={require('../../assets/imgs/player/repeat_FILL0_wght400_GRAD0_opsz48.png')}/>
        </TouchableOpacity>
    </View>
);

export default Controls;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    playButton: {
        height: 72,
        width: 72,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 72 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryControl: {
        height: 18,
        width: 18,
    },
    off: {
        opacity: 0.30,
    }
})