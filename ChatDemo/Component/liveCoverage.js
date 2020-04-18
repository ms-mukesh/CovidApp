import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Dimensions,RefreshControl } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import { format, formatDistanceToNowStrict } from 'date-fns';
const ws = Dimensions.get('window').width;
const hs = Dimensions.get('window').height;
import {color} from '../Helper/themeHelper'

const Updates = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [logs, setLogs] = useState()
    const getStates = async () => {
        try {
            setRefreshing(true);
            const [
                updateLogResponse,
            ] = await Promise.all([
                axios.get('https://api.covid19india.org/updatelog/log.json'),
            ]);
            let i, data = updateLogResponse.data, temp = [];

            for (i in data) {
                let t = {
                    activity: data[i].update.trim(),
                    time: formatDistanceToNowStrict(new Date(data[i].timestamp * 1000)) + ' ago'
                }
                temp.push(t)
            }
            setLogs(temp.reverse())
        } catch (err) {
            console.log(err);
        }
    };
    const onRefresh = React.useCallback(() => {
        getStates()
        setRefreshing(false);
    }, []);
    useEffect(() => {
        getStates();
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width:ws-15,alignSelf:'center',height:hs*.43 }}>
                <ScrollView style={{marginHorizontal:ws*0.03, }} nestedScrollEnabled={true}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            showsVerticalScrollIndicator={false}>
                    {
                        logs && logs.map((item, index) => {
                            return (
                                <View key={index} style={{backgroundColor:index % 2 == 1 ? 'white' : color.lightGray,
                                    marginVertical:ws*0.01,
                                    padding:ws*0.01,
                                }}>
                                    <Text style={{fontSize:ws*0.03,fontWeight:'bold',color:'grey'}}>{item.time}</Text>
                                    <Text style={{fontSize:ws*0.04,fontWeight:'bold'}}>{item.activity}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default Updates
