import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
    ImageBackground
} from 'react-native';
let h = Dimensions.get('window').height;
let w = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {
  setDays,
  setDailyProgress,
  setDailyRecovered,
  setDailyCases,
} from '../Actions/getLoginAction';

import {LineChart} from 'react-native-chart-kit';
import AppHeader from './appHeader';
const scale = w / 375;

const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

let maxDailyProgrees, maxDailyCase, maxRecovered, maxDeath;
let maxCasewithState = 0;
let tempCases = [];
let tempStateName = [];
let tempStateName1 = [];
let tempStateCase1 = [];
let lineChartData = {};
let tempLineData = {};
let i;
class IndiaGraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      chatFlag: false,
      stateName: [],
      stateCases: [],
    };

    maxDailyProgrees = this.props.data.maxDailyProgrees;
    maxDailyCase = this.props.data.maxDailyCases;
    maxRecovered = this.props.data.maxDailyRecovered;

    maxDeath = Math.max.apply(null, this.props.data.dailyDeathData);

    this.props.data.stateDataFinal.map((data, index) => {
      if (data.state !== 'Total') {
        tempCases.push(data.confirmed);
        tempStateName.push(data.state);
      }
    });

    let j;
    for (i = 0; i < tempCases.length; i++) {
      for (j = 0; j < tempCases.length - i - 1; j++) {
        if (parseInt(tempCases[j]) < parseInt(tempCases[j + 1])) {
          let temp = tempCases[j];
          tempCases[j] = tempCases[j + 1];
          tempCases[j + 1] = temp;
          let temp2 = tempStateName[j];
          tempStateName[j] = tempStateName[j + 1];
          tempStateName[j + 1] = temp2;
        }
      }
    }
    tempStateName1 = tempStateName;
    tempStateCase1 = tempCases;
    maxCasewithState = Math.max.apply(null, tempCases);
    lineChartData = this.props.data.lineChartData;
    lineChartData = {
      labels: this.props.data.lineChartData.labels,
      datasets: [{data: this.props.data.lineChartData.datasets[0].data}],
    };
    let templabel = [];
    let tempDataset = [];

    lineChartData.labels
      .slice(0)
      .reverse()
      .map(data => {
        templabel.push(data);
      });
    lineChartData.datasets[0].data
      .slice(0)
      .reverse()
      .map(data => {
        tempDataset.push(data);
      });
    tempLineData = {labels: templabel, datasets: [{data: tempDataset}]};
  }

  verticalChart1 = (dataArray, dayArray, titleForChat, scale) => {
    return (
      <View
        style={{
          height: h * 0.55,
          width: w - 30,
          backgroundColor: 'rgba(255,213,172,0.24)',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: h * 0.015,
        }}>
        <View style={{height: h * 0.1, justifyContent: 'center'}}>
          <Text
            style={{
              width: w * 0.65,
              fontSize: normalize(15),
              fontWeight: 'bold',
              color: 'gray',
              marginLeft: h * 0.01,
            }}>
            {titleForChat}
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              height: h * 0.027,
              width: w * 0.22,
              backgroundColor: 'purple',
              borderRadius: h * 0.05,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: normalize(12),
              }}>
              Swipe
            </Text>
            <Icon name={'arrowup'} size={h * 0.02} color={'white'} />
          </View>
        </View>
        <View style={{height: h * 0.45}}>
          <ScrollView
            style={{height: h * 0.45, width: w - 30}}
            horizontal={false}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {dataArray
              .slice(0)
              .reverse()
              .map((data, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: index == 0 ? 0 : h * 0.017,
                    }}>
                    <Text
                      style={{
                        width: w * 0.17,
                        color: 'purple',
                        fontWeight: 'bold',
                        marginLeft: h * 0.005,
                        fontSize: normalize(12),
                      }}>
                      {dayArray[dayArray.length - 1 - index]}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: w * 0.6,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: h * 0.018,
                          backgroundColor: 'red',
                          borderRadius: h * 0.01,
                          width:
                            data == scale
                              ? '95%'
                              : Math.ceil((data * 100) / scale) + '%',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        width: w * 0.18,
                        color: 'purple',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontSize: normalize(12),
                      }}>
                      {data}
                    </Text>
                  </View>
                );
              })}
          </ScrollView>
        </View>
        {/*<View style={{height:h*.05,}}>*/}
        {/*    <View style={{height:h*.001,width:w-30,backgroundColor:'gray'}}>*/}

        {/*    </View>*/}
        {/*</View>*/}
      </View>
    );
  };

  createChat = (dataArray, dayArray, titleForChat, scale) => {
    return (
      <View
        style={{
          height: h * 0.67,
          width: w - 30,
          backgroundColor: 'lavender',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: h * 0.015,
        }}>
        <Text
          style={{
            fontSize: normalize(15),
            fontWeight: 'bold',
            marginTop: h * 0.001,
          }}>
          {titleForChat}
          <Text style={{fontSize: normalize(11)}}> (Swipe Right)</Text>
        </Text>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          {dataArray
            .slice(0)
            .reverse()
            .map((data, index) => {
              return (
                <View>
                  <View
                    style={{
                      height: h * 0.55,
                      width: w * 0.15,
                      alignItems: 'flex-end',
                      flexDirection: 'row-reverse',
                      justifyContent: 'center',
                      marginTop: h * 0.01,
                    }}>
                    {data == 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'grey',
                        }}>
                        {0}
                      </Text>
                    ) : (
                      <View>
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            color: 'grey',
                          }}>
                          {data}
                        </Text>
                        <View
                          key={index}
                          style={{
                            height:
                              data == scale
                                ? '95%'
                                : Math.ceil((data * 100) / scale) + '%',
                            width: w * 0.13,
                            backgroundColor: 'lightblue',
                            borderRadius: 2,
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      height: h * 0.2,
                      width: 50,
                      marginLeft: w * 0.015,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: normalize(11),
                        marginTop: h * 0.001,
                      }}>
                      {dayArray[dayArray.length - 1 - index]}
                    </Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  displayChat = () => {
    return (
      <View
        style={{
          height: h * 0.67,
          width: w - 30,
          backgroundColor: 'lavender',
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: h * 0.02,
        }}>
        <Text
          style={{
            fontSize: normalize(15),
            fontWeight: 'bold',
            marginTop: h * 0.001,
          }}>
          Check the Progress
          <Text style={{fontSize: normalize(11)}}> (Swipe Right)</Text>
        </Text>
        <ScrollView horizontal={true} nestedScrollEnabled={true}>
          <LineChart
            data={tempLineData}
            width={tempLineData.labels.length * 55} // from react-native
            height={h * 0.67}
            yAxisLabel={''}
            fromZero={true}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: 'lavender',
              backgroundGradientFrom: 'lavender',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            renderDotContent={({x, y, index}) => {
              return (
                <View
                  style={{
                    position: 'absolute',
                    left:
                      index !== tempLineData.labels.length - 1 ? x - 10 : x + 5,
                    top:
                      index !== tempLineData.labels.length - 1
                        ? y - 25
                        : y - 10,
                    zIndex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: w * 0.035,
                      fontWeight: '600',
                      color: 'black',
                      marginTop: index == 0 ? h * 0.015 : 0,
                      marginLeft: index == 0 ? w * 0.035 : 0,
                    }}>
                    {tempLineData.datasets[0].data[index]}
                  </Text>
                </View>
              );
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title={'Graph Representation(India)'}
          onPress={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{flex: 1}}>
            <ImageBackground source={require('../Images/assets/screen_bg.png')} style={{flex:1}}>
          {this.verticalChart1(
            this.props.data.dailyProgres,
            this.props.data.dayArray,
            'Graph For Daily Progress',
            maxDailyProgrees,
          )}
          {this.verticalChart1(
            this.props.data.dailyCases,
            this.props.data.dayArray,
            'Graph For Daily Accumulated Cases',
            maxDailyCase,
          )}
          {this.verticalChart1(
            this.props.data.recoveredCases,
            this.props.data.dayArray,
            'Graph For Daily Recovering',
            maxRecovered,
          )}

          {/*{this.displayChat()}*/}
          {this.verticalChart1(
            tempStateCase1.reverse(),
            tempStateName1.reverse(),
            'Check where your State Stands',
            maxCasewithState,
          )}

          {this.verticalChart1(
            this.props.data.dailyDeathData,
            this.props.data.dayArray,
            'Graph For Deaths',
            maxDeath,
          )}
            </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({});

function mapSatateToProps(state) {
  return {
    data: state.getLoginReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setDays: data => setDays(data),
    setProgress: data => setDailyProgress(data),
    setRecovered: data => setDailyRecovered(data),
    setDailyCases: data => setDailyCases(data),
  };
}
export default connect(
  mapSatateToProps,
  mapDispatchToProps(),
)(IndiaGraphPage);
