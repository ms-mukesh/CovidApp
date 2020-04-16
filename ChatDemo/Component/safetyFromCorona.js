import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const ws = Dimensions.get('window').width;
const hs = Dimensions.get('window').height;
import AppHeader from '../Component/appHeader'
const Protect = (props) => {
    const [spread, setSpread] = useState(false);
    const [hands, setHands] = useState(false);
    const [quarantine, setQuarantine] = useState(false);
    const [face, setFace] = useState(false);
    const [cough, setCough] = useState(false);
    const [clean, setClean] = useState(false);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader title={'Stay-Safe'} onPress={()=>props.navigation.openDrawer()}/>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: ws * 0.03, }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: hs * 0.03 }}>
                        <Text style={{ fontSize: ws * 0.1, textAlign: 'center', }}>How to Protect Yourself & Others</Text>
                    </View>
                    <View >
                        <Text style={{ fontSize: ws * 0.07, color: 'red', textDecorationLine: 'underline', }}>
                            Know How it Spreads
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View >
                                <Image source={require('../Images/spread.png')} style={{ marginRight: ws * 0.02, width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                            <View style={{ width: ws * 0.55 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.045 }}>There is currently no vaccine to prevent coronavirus disease 2019.</Text>
                                <Text style={{ fontWeight: '700', color: 'grey' }}>The best way to prevent illness is to avoid being exposed to this virus.</Text>
                                {spread && <View>
                                    <Text style={{ fontWeight: '700', color: 'grey' }}>The virus is thought to spread mainly from person-to-person.</Text>
                                    <Text style={{ color: 'grey' }}>
                                        Between people who are in close contact with one another (within about 6 feet).{'\n'}
                                        Through respiratory droplets produced when an infected person coughs, sneezes or talks.{'\n'}
                                        These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs.{'\n'}
                                        Some recent studies have suggested that COVID-19 may be spread by people who are not showing symptoms.
                                    </Text>
                                </View>}
                                <TouchableOpacity onPress={() => { setSpread(!spread) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>{spread ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: ws * 0.07, color: 'green', textDecorationLine: 'underline', }}>
                            Everyone Should
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View style={{ width: ws * 0.6 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.055 }}>Clean your hands often</Text>
                                <View>
                                    <Text style={{ color: 'grey' }}>
                                        Wash your hands often with soap
                                        and water for at least 20 seconds {hands && 'especially after you have been in a public place, or after blowing your nose, coughing, or sneezing.' +
                                    'If soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol. Cover all surfaces of your hands and rub them together until they feel dry.' +
                                    'Avoid touching your eyes, nose, and mouth with unwashed hands.'}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { setHands(!hands) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue',marginTop:hs*0.005 }}>{hands ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Image source={require('../Images/washhands.png')} style={{ width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View >
                                <Image source={require('../Images/quarantine.png')} style={{ marginRight: ws * 0.03, width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                            <View style={{ width: ws * 0.6 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.055 }}>Avoid close contact</Text>
                                <View>
                                    <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                                        Avoid close contact with people who are sick.
                                    </Text>
                                    <Text style={{ color: 'grey' }}>
                                        Stay home as much as possible.
                                        {quarantine &&
                                        'Put distance between yourself and other people.' +
                                        'Remember that some people without symptoms may be able to spread virus.' +
                                        'Keeping distance from others is especially important for people who are at higher risk of getting very sick.'}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { setQuarantine(!quarantine) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue',marginTop:hs*0.005 }}>{quarantine ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View style={{ width: ws * 0.6 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.05 }}>Cover your mouth and nose with a cloth face cover when around others</Text>
                                <View>
                                    <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                                        You could spread COVID-19 to others even if you do not feel sick.
                                    </Text>
                                    {face && <Text style={{ color: 'grey' }}>
                                        Everyone should wear a cloth face cover when they have to go out in public, for example to the grocery store or to pick up other necessities.
                                        Cloth face coverings should not be placed on young children under age 2, anyone who has trouble breathing, or is unconscious, incapacitated or otherwise unable to remove the mask without assistance.
                                        The cloth face cover is meant to protect other people in case you are infected.
                                        Do NOT use a facemask meant for a healthcare worker.
                                        Continue to keep about 6 feet between yourself and others. The cloth face cover is not a substitute for social distancing.
                                    </Text>}
                                </View>
                                <TouchableOpacity onPress={() => { setFace(!face) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue',marginTop:hs*0.005 }}>{face ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Image source={require('../Images/face.png')} style={{ width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View >
                                <Image source={require('../Images/cough.png')} style={{ marginRight: ws * 0.03, width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                            <View style={{ width: ws * 0.6 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.055 }}>Cover coughs and sneezes</Text>
                                <View>
                                    <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                                        If you are in a private setting and do not have on your cloth face covering, remember to always cover
                                    </Text>
                                    {cough && <Text style={{ color: 'grey' }}>
                                        your mouth and nose with a tissue when you cough or sneeze or use the inside of your elbow.
                                        Throw used tissues in the trash.
                                        Immediately wash your hands with soap and water for at least 20 seconds. If soap and water are not readily available, clean your hands with a hand sanitizer that contains at least 60% alcohol.
                                    </Text>}
                                </View>
                                <TouchableOpacity onPress={() => { setCough(!cough) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue',marginTop:hs*0.005 }}>{cough ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: ws * 0.03 }}>
                            <View style={{ width: ws * 0.6 }}>
                                <Text style={{ fontWeight: '700', fontSize: ws * 0.055 }}>Clean and disinfect</Text>
                                <View>
                                    <Text style={{ color: 'grey' }}>
                                        Clean and disinfect frequently touched surfaces daily. This includes tables, doorknobs, light switches,
                                        {clean && 'countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.'+
                                        'If surfaces are dirty, clean them: Use detergent or soap and water prior to disinfection.'}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { setClean(!clean) }}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue',marginTop:hs*0.005 }}>{clean ? 'Read less' : 'Read more'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Image source={require('../Images/clean.png')} style={{ width: ws * 0.3, height: ws * 0.3 }}></Image>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default Protect
