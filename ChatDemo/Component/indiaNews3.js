import React, {Component} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import ImageSlider from 'react-native-image-slider';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  PixelRatio,
  Modal,
  FlatList,
} from 'react-native';
import axios from 'axios';
import index from 'rn-fetch-blob';
import {color} from '../Helper/themeHelper';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const scale = w / 375;
const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
const NewsCotent = [];
export default class worldnewslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      newsHeading: [],
      opacity: 0,
      url: [],
      newsContentArray: [],
      newsImageArray: [],
      showDetailNewsFlag: false,
      tempIndex: 0,
      renderFlag: true,
      currentImage: '',
      scrollIndex: 0,
    };
  }
  getNews = () => {
    return new Promise(resolve => {
      axios.get('https://timesofindia.indiatimes.com/india').then(res => {
        return resolve(res);
      });
    });
  };

  getTitle = url => {
    let finalurl = 'https://timesofindia.indiatimes.com/' + url;
    return new Promise(resolve => {
      axios.get(finalurl).then(res => {
        return resolve(res);
      });
    });
  };

  getHeadlineDemo = () => {
    return new Promise(resolve => {
      axios
        .get('https://covidapi123.herokuapp.com/covid/api/getNewsHeading')
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  getNewsDemo = dataArray => {
    const data = {pageUrl: dataArray};

    return new Promise(resolve => {
      axios
        .post('https://covidapi123.herokuapp.com/covid/api/getNews2', data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  getNewContent = newsHeadlineArray => {
    return new Promise(resolve => {
      let urldata = 'https://timesofindia.indiatimes.com';
      let tempNewsArray = [];
      let tempImageArray = [];
      let tempUrl = '';
      let i = 0;
      newsHeadlineArray.map((data, index) => {
        tempUrl = urldata + data;
        if (index < 16) {
          axios
            .get(tempUrl)
            .then(res => {
              let str = res.data;
              let imgStr = res.data;
              let tempImageURl = '';
              tempImageURl = imgStr.substring(
                imgStr.indexOf('<meta property="og:image"'),
                imgStr.indexOf('<meta property="og:image"') + 200,
              );
              tempImageArray.push(
                tempImageURl.substring(
                  tempImageURl.indexOf('"', 25) + 1,
                  tempImageURl.indexOf('"', 50),
                ),
              );
              let tempNews = str.substring(
                str.indexOf('<div class="_3WlLe clearfix  ">'),
                str.length,
              );
              tempNews = tempNews
                .substring(0, str.lastIndexOf('<br/>'))
                .replace(/(<([^>]+)>)/gi, '');
              tempNews = tempNews.split('.');
              tempNewsArray.push({news: tempNews, image: tempImageArray[i]});
              i = i + 1;
              if (index == 15) {
                return resolve(tempNewsArray);
              }
            })
            .catch(err => {
              console.log('error' + err);
            });
        }
      });
    });
  };
  showDetailNews = (data, index) => {
    this.setState({showDetailNewsFlag: true, tempIndex: data});
    this.setState({currentImage: this.state.newsImageArray[index]});
  };

  componentDidMount(): void {
    // this.getNews().then((res)=> {
    //     let str = res.data;
    //     let news;
    //     news=str.substring(str.lastIndexOf('<ul class="list5 clearfix" data-msid="-2128936835">'),str.length)
    //     var count = (news.match(/<a href=/g) || []).length;
    //
    //     var regex = /<a href=/gi, result, indices = [];
    //     while ( (result = regex.exec(news)) ) {
    //         indices.push(result.index);
    //     }
    //     let url=[]
    //     for(let i=0;i<count;i++)
    //     {
    //         let temp=news.substring(indices[i],news.length)
    //         url.push(temp.substring(9,temp.indexOf('"',10)))
    //     }
    //     let tempUrl2=[]
    //     url.map((data,index)=>{
    //         if(index<10)
    //         {
    //             tempUrl2.push(data)
    //         }
    //
    //     })
    //     this.getNewContent(url).then((res)=>{
    //         let tempNewsArray=[]
    //         let tempImageArray=[]
    //         res.map((data,index)=>{
    //             tempNewsArray.push(data.news)
    //             tempImageArray.push(data.image)
    //         })
    //
    //         this.setState({newsContentArray:tempNewsArray,newsImageArray:tempImageArray})
    //         this.setState({renderFlag:false})
    //     }).catch((err)=>{
    //         console.log("error="+err)
    //     })
    //
    //
    //
    //
    // })
    let tempDemoUrls = [];
    let tempNewsArray = [];
    let tempImageArray = [];

    this.getHeadlineDemo().then(res => {
      tempDemoUrls = res.data;
      this.getNewsDemo(tempDemoUrls).then(res => {
        console.log('dataaasssssss');
        res.map((data, index) => {
          tempNewsArray.push(data.news);
          tempImageArray.push(data.image);
        });
        this.setState({
          renderFlag: false,
          newsContentArray: tempNewsArray,
          newsImageArray: tempImageArray,
        });
      });
    });
  }

  render() {
    const {newsHeadinListView, sourceTitle} = style;
    const Images = [
      this.state.newsImageArray[0],
      'https://source.unsplash.com/1024x768/?water',
      'https://source.unsplash.com/1024x768/?girl',
      'https://source.unsplash.com/1024x768/?tree', // Network image
    ];

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: h * 0.3,
              width: w,
              marginTop: h * 0.02,
              alignSelf: 'center',
            }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={node => (this.scroll = node)}
              scrollEventThrottle={16}
              pagingEnabled={true}
              onMomentumScrollEnd={event => {
                let i = event.nativeEvent.contentOffset.x / w;
                this.setState({...this.state, scrollIndex: i});
              }}
              horizontal={true}>
              <View style={{flex: 1, width: w, height: null}}>
                <Image
                  style={{
                    width: w - 40,
                    height: h * 0.3,
                    alignSelf: 'center',
                    borderRadius: h * 0.01,
                  }}
                  source={{uri: this.state.newsImageArray[0]}}
                />
              </View>
              <View style={{flex: 1, width: w, height: null}}>
                <Image
                  style={{
                    width: w - 40,
                    height: h * 0.3,
                    alignSelf: 'center',
                    borderRadius: h * 0.01,
                  }}
                  source={{uri: this.state.newsImageArray[1]}}
                />
              </View>
              <View style={{flex: 1, width: w, height: null}}>
                <Image
                  style={{
                    width: w - 40,
                    height: h * 0.3,
                    alignSelf: 'center',
                    borderRadius: h * 0.01,
                  }}
                  source={{uri: this.state.newsImageArray[2]}}
                />
              </View>
              <View style={{flex: 1, width: w, height: null}}>
                <Image
                  style={{
                    width: w - 40,
                    height: h * 0.3,
                    alignSelf: 'center',
                    borderRadius: h * 0.01,
                  }}
                  source={{uri: this.state.newsImageArray[3]}}
                />
              </View>
              <View style={{flex: 1, width: w, height: null}}>
                <Image
                  style={{
                    width: w - 40,
                    height: h * 0.4,
                    alignSelf: 'center',
                    borderRadius: h * 0.01,
                  }}
                  source={{uri: this.state.newsImageArray[4]}}
                />
              </View>
            </ScrollView>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                // marginTop: h * 0.015,
                position: 'absolute',
                bottom: h * 0.02,
                zIndex: 1,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.scroll.scrollTo({x: 0});
                }}>
                <View
                  style={{
                    height: h * 0.015,
                    backgroundColor:
                      this.state.scrollIndex === 0 ? 'red' : 'gray',
                    width: h * 0.015,
                    borderRadius: h * 0.009,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.scroll.scrollTo({x: w});
                }}>
                <View
                  style={{
                    height: h * 0.015,
                    backgroundColor:
                      this.state.scrollIndex === 1 ? 'red' : 'gray',
                    width: h * 0.015,
                    borderRadius: h * 0.009,
                    marginLeft: w * 0.03,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.scroll.scrollTo({x: w * 2});
                }}>
                <View
                  style={{
                    height: h * 0.015,
                    backgroundColor:
                      this.state.scrollIndex === 2 ? 'red' : 'gray',
                    width: h * 0.015,
                    borderRadius: h * 0.009,
                    marginLeft: w * 0.03,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.scroll.scrollTo({x: w * 3});
                }}>
                <View
                  style={{
                    height: h * 0.015,
                    backgroundColor:
                      this.state.scrollIndex === 3 ? 'red' : 'gray',
                    width: h * 0.015,
                    borderRadius: h * 0.009,
                    marginLeft: w * 0.03,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.scroll.scrollTo({x: w * 4});
                }}>
                <View
                  style={{
                    height: h * 0.015,
                    backgroundColor:
                      this.state.scrollIndex === 4 ? 'red' : 'gray',
                    width: h * 0.015,
                    borderRadius: h * 0.009,
                    marginLeft: w * 0.03,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontSize: normalize(18),
              color: color.purple,
              fontWeight: 'bold',
              marginTop: h * 0.01,
              marginLeft: w * 0.02,
              marginBottom: h * 0.01,
            }}>
            News Headlines
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {// data[0].replace(/[^a-zA-Z0-9 ]/g, "")
            this.state.newsContentArray.map((data, index) => {
              if (data[0].substring(0, 5) != '') {
                return (
                  <TouchableOpacity
                    onPress={() => this.showDetailNews(data, index)}>
                    <View
                      style={{
                        height: h * 0.15,
                        width: w - 40,
                        alignSelf: 'center',
                        marginTop: h * 0.01,
                        backgroundColor: 'lightgray',
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: h * 0.05,
                          marginTop: 5,
                          marginLeft: 5,
                        }}>
                        <Image
                          source={require('../Images/timesOfIndiaLogo.png')}
                          style={{
                            height: h * 0.05,
                            width: h * 0.05,
                            borderRadius: h * 0.025,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: 'bold',
                            marginTop: h * 0.01,
                            marginLeft: 10,
                          }}>
                          Coronavirus
                        </Text>
                      </View>

                      <View
                        style={{
                          height: h * 0.04,
                          width: w - 80,
                          marginLeft: 30,
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode={'tail'}
                          style={{fontSize: normalize(14), textAlign: 'left'}}>
                          {data[0].replace(/[^a-zA-Z0-9 ]/g, '').trim()}
                        </Text>
                      </View>
                      <Text
                        style={{
                          alignSelf: 'flex-end',
                          color: 'blue',
                          marginTop: 8,
                          marginRight: 5,
                          fontSize: normalize(12),
                        }}>
                        Read More
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
            <Text style={sourceTitle}>Source:-TOI(Times of India)</Text>
            {this.state.showDetailNewsFlag && (
              <Modal visible={true} animated={true} transparent={false}>
                <SafeAreaView style={{flex: 1}}>
                  <View
                    style={{
                      flex: 0.04,
                      justifyContent: 'center',
                      padding: h * 0.005,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({showDetailNewsFlag: false})
                      }>
                      <Text
                        style={{fontSize: normalize(16), fontWeight: '600'}}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={{flex: 0.96}}>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, padding: h * 0.01}}>
                        <Image
                          style={{
                            width: w,
                            height: h * 0.4,
                            marginTop: h * 0.02,
                          }}
                          source={{uri: this.state.currentImage}}
                        />
                        <View style={{marginTop: h * 0.02, padding: h * 0.01}}>
                          {this.state.tempIndex.map((data, index) => {
                            if (index < 6) {
                              return (
                                <View style={{marginTop: h * 0.0005}}>
                                  <Text
                                    style={{
                                      fontSize: normalize(15),
                                      textAlign: 'left',
                                    }}>
                                    {data.replace(/[^a-zA-Z0-9 ]/g, '').trim()}
                                  </Text>
                                </View>
                              );
                            }
                          })}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </Modal>
            )}

            {this.state.renderFlag && (
              <Modal visible={true} animated={false} transparent={true}>
                <SafeAreaView
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    color="black"
                    animating={this.state.renderFlag}
                  />
                </SafeAreaView>
              </Modal>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  newsHeadinListView: {
    height: h * 0.13,
    marginTop: h * 0.01,
    padding: h * 0.015,
  },
  sourceTitle: {
    textAlign: 'right',
    fontSize: normalize(15),
    padding: h * 0.02,
    fontWeight: '500',
  },
});
