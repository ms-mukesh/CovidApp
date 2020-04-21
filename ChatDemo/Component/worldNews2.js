import React, {Component} from 'react';
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
} from 'react-native';
import axios from 'axios';
import index from 'rn-fetch-blob';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
import {color} from '../Helper/themeHelper';

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
      showDetailNewsFlag: false,
      scrollIndex: 0,
    };
  }
  getNews = () => {
    return new Promise(resolve => {
      axios.get('https://www.who.int/news-room/releases').then(res => {
        return resolve(res);
      });
    });
  };

  getTitle = url => {
    let finalurl = 'https://www.who.int/' + url;
    return new Promise(resolve => {
      axios.get(finalurl).then(res => {
        return resolve(res);
      });
    });
  };

  getNewsHeading = arrayName => {
    let newsHeading = [];
    return new Promise(resolve => {
      arrayName.map((data, index) => {
        this.getTitle(data)
          .then(res => {
            let str = res.data;
            newsHeading.push(
              str.substring(str.indexOf('<h1 >') + 5, str.indexOf('</h1>')),
            );
          })
          .then(() => {
            if (newsHeading.length == 5) {
              return resolve(newsHeading);
            }
          });
      });
    });
  };

  showDetailNews = index => {
    this.getTitle(this.state.url[index]).then(res => {
      let str = res.data;
      let newsContent = str.substring(
        str.indexOf('<article class="sf-detail-body-wrapper" >'),
        str.indexOf('</article>'),
      );
      newsContent = newsContent
        .substring(newsContent.indexOf('<div >'), newsContent.indexOf('</div>'))
        .replace(/(<([^>]+)>)/gi, '');
      newsContent = newsContent.replace(/&mdash;/gi, '');
      newsContent = newsContent.replace(/&nbsp;/gi, '');
      newsContent = newsContent.replace(/&rsquo;/gi, '');
      newsContent = newsContent.replace(/&ldquo;/gi, '');
      newsContent = newsContent.replace(/&ndash;/gi, '');
      let newsArray = newsContent.split('.');
      this.setState({newsContentArray: []});
      this.setState({newsContentArray: newsArray});
      this.setState({showDetailNewsFlag: true});
    });
  };
  componentDidMount(): void {
    this.getNews().then(res => {
      let str = res.data;
      console.log('data');
      str = str.substring(str.lastIndexOf('Latest'), str.length);
      var count = (str.match(/<a href=/g) || []).length;
      let i;
      let tempIndex = 0,
        tempIndex2 = 0;
      let url = [];

      var regex = /<a href=/gi,
        result,
        indices = [];
      while ((result = regex.exec(str))) {
        indices.push(result.index);
      }
      var regex1 = /role="link">/gi,
        result1,
        indices1 = [];
      while ((result1 = regex1.exec(str))) {
        indices1.push(result1.index);
      }
      for (i = 0; i < indices1.length - 1; i++) {
        if (i != 0) {
          tempIndex = str.indexOf('<a href=', indices[i]);
          url.push(
            str.substring(tempIndex, str.indexOf('role="link">', indices1[i])),
          );
        } else {
          tempIndex = str.indexOf('<a href=');
          url.push(str.substring(tempIndex, str.indexOf('role="link">')));
        }
      }
      let tempUrl = [];
      let temp;
      url.map(data => {
        if (data.indexOf('covid') > 0 || data.indexOf('Covid') > 0) {
          // console.log(data.substring(data.indexOf('/"/')))
          temp = data.substring(data.indexOf('"') + 1, data.length);
          tempUrl.push(temp.substring(0, temp.indexOf('"')));
        }
      });
      this.setState({url: tempUrl});

      let newsHeading = [];
      tempUrl.map((data, index) => {
        this.getTitle(data).then(res => {
          let str = res.data;
          newsHeading.push(
            str.substring(str.indexOf('<h1 >') + 5, str.indexOf('</h1>')),
          );
        });
      });

      this.getNewsHeading(tempUrl).then(res => {
        this.setState({newsHeading: res});
      });
    });
  }

  render() {
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
              ref={node => (this.scroll = node)}
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
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
                  source={require('../Images/whoImage1.jpeg')}
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
                  source={require('../Images/whoImage2.jpeg')}
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
                  source={require('../Images/whoImage3.jpeg')}
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
                  source={require('../Images/whoImage4.jpeg')}
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
                  source={require('../Images/whoImage5.jpeg')}
                />
              </View>
            </ScrollView>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                alignSelf: 'center',
                bottom: h * 0.02,
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
                    borderRadius: h * 0.0075,
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
                    borderRadius: h * 0.0075,
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
                    borderRadius: h * 0.0075,
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
                    borderRadius: h * 0.0075,
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
                    borderRadius: h * 0.0075,
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
            }}>
            News Headlines
          </Text>
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1, padding: h * 0.01}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
                nestedScrollEnabled={true}>
                {this.state.newsHeading.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.showDetailNews(index)}>
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
                            source={require('../Images/whoLogo.png')}
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
                            style={{
                              fontSize: normalize(14),
                              textAlign: 'left',
                            }}>
                            {data.replace(/[^a-zA-Z ]/g, '').trim()}
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
                })}
              </ScrollView>

              <Text
                style={{
                  textAlign: 'right',
                  fontSize: normalize(15),
                  padding: h * 0.02,
                  fontWeight: '500',
                }}>
                Source:-WHO(World health organization)
              </Text>

              {this.state.showDetailNewsFlag && (
                <Modal visible={true} animated={true} transparent={false}>
                  <SafeAreaView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          padding: h * 0.005,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({showDetailNewsFlag: false})
                          }>
                          <Text style={{fontSize: normalize(16),fontWeight:'600'}}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flex: 9,
                          borderTopWidth: h * 0.001,
                          padding: 10,
                        }}>
                        <ScrollView style={{flex: 1}}>
                          {this.state.newsContentArray.map((data, index) => {
                            if (index < 7) {
                              return (
                                <View style={{marginTop: h * 0.0001}}>
                                  <Text
                                    style={{
                                      fontSize: normalize(15),
                                      textAlign: 'left',
                                    }}>
                                    {data.replace(/[^a-zA-Z ]/g, '').trim()}
                                  </Text>
                                </View>
                              );
                            }
                          })}
                        </ScrollView>
                      </View>
                    </View>
                  </SafeAreaView>
                </Modal>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
