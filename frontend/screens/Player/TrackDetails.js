import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const TrackDetails = ({
                          title,
                          artist,
                          onAddPress,
                          onMorePress,
                          onTitlePress,
                          onArtistPress,
                      }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onAddPress}>
            <Image style={styles.button}
                   source={require('../../assets/imgs/player/add_circle_FILL0_wght400_GRAD0_opsz48.png')} />
        </TouchableOpacity>
        <View style={styles.detailsWrapper}>
            <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
            <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
        </View>
        <TouchableOpacity onPress={onMorePress}>
            <View style={styles.moreButton}>
                <Image style={styles.moreButtonIcon}
                       source={require('../../assets/imgs/player/expand_more_FILL0_wght400_GRAD0_opsz48.png')} />
            </View>
        </TouchableOpacity>
    </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        paddingRight: 20,
    },
    detailsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    artist: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        opacity: 0.72,
    },
    moreButton: {
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        opacity: 0.72,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreButtonIcon: {
        height: 17,
        width: 17,
    }
});