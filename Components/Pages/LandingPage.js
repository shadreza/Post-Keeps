import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import { FadeInView }  from '../Animation/FadeInView';

export default function LandingPage({toggler}) {

    const logoImageURL = 'https://i.ibb.co/TW97Jry/1055661.png'
    const logoName     = 'Post-Keeps'

    const logoLoadTime = 2000
    const textLoadTime = 4000

    useEffect(() =>{
        setTimeout(() => {
          toggler[1]( !toggler[0] )
        }, 4000)
    },[])

    return (
        <FadeInView time={logoLoadTime}>
            <View style={styles.landingPageView}>     
                <Image
                    source={{uri: logoImageURL}}
                    style={styles.logoImage}
                />     
                <FadeInView time={textLoadTime} style={{alignItems  : 'center'}}>
                    <Text style={styles.logoText}> {logoName} </Text>
                    <Text style={styles.heroText}> Where you Blog 🔥 </Text>
                </FadeInView>
            </View>
        </FadeInView>
    );
}

const styles = StyleSheet.create({
    landingPageView: {
        justifyContent  : 'center',
        alignItems      : 'center',
        padding         : Sizes.XLG,
    },
    logoImage : {
        width        : Sizes.XXXLG,
        height       : Sizes.XXXLG,
        marginBottom : Sizes.XXLG,
        marginTop    : Sizes.XXLG,
    },
    logoText : {
        fontSize : Sizes.XLG,
        color    : Color.orange,
        fontWeight : 'bold',
    },
    heroText : {
        fontSize : Sizes.xlg,
        color    : Color.lavender,
        fontWeight : 'bold',
        marginTop : Sizes.lg,
    },
});
