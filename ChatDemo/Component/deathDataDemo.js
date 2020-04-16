import React, {Component} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

export class Deceased extends Component {
    constructor() {
        super();
        this.data = [];
        this.states = [];
        this.cities = [];
        this.state = {
            deceasedData: [],
        };
    }
    componentDidMount(): void {
        this.fetchDataFromServer();
        SplashScreen.hide();
    }

    fetchDataFromServer() {
        axios
            .get('https://api.covid19india.org/deaths_recoveries.json')
            .then(res => {
                this.data = res.data.deaths_recoveries;
                // console.log(this.data);
                this.states = [
                    ...new Set(
                        this.data.map(
                            item =>
                                item.state !== '' &&
                                item.state !== 'Kerala/Puducherry?' &&
                                item.state,
                        ),
                    ),
                ];
                this.states.sort();
                this.states.pop();

                // Maharastra
                // this.states.pop();
                this.states.forEach(state => {
                    let temp = new Set();
                    this.data.forEach(item => {
                        if (
                            item.state === state &&
                            item.district !== '' &&
                            item.patientstatus === 'Deceased'
                        ) {
                            temp.add(item.district);
                        }
                    });
                    this.cities.push({key: state, data: Array.from(temp)});
                    // this.setState({isLoading: false});
                });
                this.cities = this.cities.filter(item => item.data.length > 0 && item);
                let finalData = [];
                this.cities.forEach(state => {
                    let tempCity = [];
                    state.data.forEach(city => {
                        let counter = 0;
                        this.data.forEach(item => {
                            if (item.district === city && item.patientstatus === 'Deceased') {
                                counter++;
                            }
                        });
                        tempCity.push({city, totalDeceased: counter});
                    });
                    finalData.push({state: state.key, data: tempCity});
                });
                this.setState({deceasedData: finalData});
                console.log('city -', this.state.deceasedData);
            })
            .catch(error => alert(error));
    }

    render() {
        return (
            <View>
                <Text> TextInComponent </Text>
            </View>
        );
    }
}

export default Deceased;
