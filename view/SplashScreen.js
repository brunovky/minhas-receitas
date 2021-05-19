import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { AdMobInterstitial } from 'react-native-admob';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        AdMobInterstitial.setAdUnitID('ca-app-pub-8149775678057278/4719428654');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);

        AsyncStorage.getItem('userId').then(userId => {
            if (userId) {
                navigation.replace("RecipesScreen", {userId: userId});
            } else {
                navigation.replace("LoginScreen");
            }
        });
    }, [navigation]);

    return (
        <View />
    );

}