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
      tempIndex: 0,
      renderFlag: true,
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

  getNewContent = newsHeadlineArray => {
    return new Promise(resolve => {
      let urldata = '';
      let tempNewsArray = [];

      newsHeadlineArray.map((data, index) => {
        urldata = {pageUrl: data};
        if (index < 17) {
          axios
            .post(
              'https://covidapi123.herokuapp.com/covid/api/getIndiaNews',
              urldata,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(res => {
              tempNewsArray.push(res.data);

              if (index == 15) {
                return resolve(tempNewsArray);
              }
            });
        }
      });
    });
  };

  // getNewsHeading=(arrayName)=>{
  //     let newsHeading=[]
  //     return new Promise((resolve=>{
  //         arrayName.map((data,index)=>{
  //             this.getTitle(data).then((res)=>{
  //                 let str=res.data;
  //                 newsHeading.push(str.substring(str.indexOf('<h1 >')+5,str.indexOf('</h1>')))
  //             }).then(()=>{
  //                 if(newsHeading.length==5)
  //                 {
  //                     return resolve(newsHeading)
  //                 }
  //
  //             })
  //         })
  //     }))
  // }

  showDetailNews = index => {
    this.setState({showDetailNewsFlag: true, tempIndex: index});
  };
  componentDidMount(): void {
    this.getNews().then(res => {
      let str = res.data;
      let news;
      news = str.substring(
        str.lastIndexOf('<ul class="list5 clearfix" data-msid="-2128936835">'),
        str.length,
      );
      var count = (news.match(/<a href=/g) || []).length;

      var regex = /<a href=/gi,
        result,
        indices = [];
      while ((result = regex.exec(news))) {
        indices.push(result.index);
      }
      let url = [];
      for (let i = 0; i < count; i++) {
        let temp = news.substring(indices[i], news.length);
        url.push(temp.substring(9, temp.indexOf('"', 10)));
      }

      this.getNewContent(url).then(res => {
        this.setState({newsContentArray: res});
        this.setState({renderFlag: false});
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {this.state.newsContentArray.map((data, index) => {
              return (
                <View
                  style={{
                    height: h * 0.15,
                    marginTop: h * 0.01,
                    padding: h * 0.01,
                    backgroundColor: index % 2 == 1 ? '#ECEDEE' : 'white',
                  }}>
                  <TouchableOpacity onPress={() => this.showDetailNews(index)}>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{fontSize: normalize(15)}}>
                      {data.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
            <Text style={{textAlign: 'right', fontSize: normalize(12)}}>
              Source:-TOI(Times of India)
            </Text>

            {this.state.showDetailNewsFlag && (
              <Modal visible={true} animated={true} transparent={false}>
                <SafeAreaView style={{flex: 1}}>
                  <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, padding: h * 0.01}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({showDetailNewsFlag: false})
                          }>
                          <Text style={{fontSize: normalize(15)}}>Cancel</Text>
                        </TouchableOpacity>
                        <View>
                          <Image
                            style={{
                              width: w,
                              height: h * 0.4,
                              marginTop: h * 0.02,
                            }}
                            source={{
                              uri: this.state.newsContentArray[
                                this.state.tempIndex
                              ].image,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: normalize(18),
                              marginTop: h * 0.01,
                            }}>
                            {
                              this.state.newsContentArray[this.state.tempIndex]
                                .description
                            }
                          </Text>
                          <Text
                            style={{
                              fontSize: normalize(15),
                              marginTop: h * 0.02,
                              textAlign: 'right',
                            }}>
                            Source-
                            {
                              this.state.newsContentArray[this.state.tempIndex]
                                .source
                            }
                          </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  safestyle: {
    flex: 1,
  },
  viewstyle: {
    flex: 1,
  },
  titleView: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textview: {
    fontSize: 30,
  },
  loadingView: {
    marginTop: 50,
  },
  listView: {
    flex: 0.95,
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    // color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
