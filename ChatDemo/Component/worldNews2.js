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
    Image, PixelRatio, Modal,
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
        this.state={
            flag:false,
            newsHeading:[],
            opacity:0,
            url:[],
            newsContentArray:[],
            showDetailNewsFlag:false
        }
    }
    getNews=()=>{
        return new Promise((resolve=>{
            axios.get("https://www.who.int/news-room/releases")
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }


    getTitle=(url)=>{
        let finalurl="https://www.who.int/"+url;
        return new Promise((resolve=>{
            axios.get(finalurl)
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }


    getNewsHeading=(arrayName)=>{
        let newsHeading=[]
        return new Promise((resolve=>{
            arrayName.map((data,index)=>{
                this.getTitle(data).then((res)=>{
                    let str=res.data;
                    newsHeading.push(str.substring(str.indexOf('<h1 >')+5,str.indexOf('</h1>')))
                }).then(()=>{
                    if(newsHeading.length==5)
                    {
                        return resolve(newsHeading)
                    }

                })
            })
        }))
    }

    showDetailNews=(index)=>{
        this.getTitle(this.state.url[index]).then((res)=>{
            let str=res.data;
            let newsContent=str.substring(str.indexOf('<article class="sf-detail-body-wrapper" >'),str.indexOf('</article>'))
            newsContent=newsContent.substring(newsContent.indexOf('<div >'),newsContent.indexOf('</div>')).replace( /(<([^>]+)>)/ig, '')
            newsContent=newsContent.replace(/&mdash;/ig,'')
            newsContent=newsContent.replace(/&nbsp;/ig,'')
            newsContent=newsContent.replace(/&rsquo;/ig,'')
            newsContent=newsContent.replace(/&ldquo;/ig,'')
            newsContent=newsContent.replace(/&ndash;/ig,'')
            let newsArray=newsContent.split(".")
            this.setState({newsContentArray:[]})
            this.setState({newsContentArray:newsArray})
            this.setState({showDetailNewsFlag:true})

        })
    }
    componentDidMount(): void {
        this.getNews().then((res)=>{
            let str=res.data;
            console.log('data')
            str=str.substring(str.lastIndexOf('Latest'),str.length)
            var count = (str.match(/<a href=/g) || []).length;
            let i;
            let tempIndex=0,tempIndex2=0;
            let url=[]

            var regex = /<a href=/gi, result, indices = [];
            while ( (result = regex.exec(str)) ) {
                indices.push(result.index);
            }
            var regex1 = /role="link">/gi, result1, indices1 = [];
            while ( (result1 = regex1.exec(str)) ) {
                indices1.push(result1.index);
            }
           for(i=0;i<indices1.length-1;i++)
            {
                    if(i!=0)
                    {
                        tempIndex=str.indexOf('<a href=',indices[i])
                        url.push(str.substring(tempIndex,str.indexOf('role="link">',indices1[i])))
                    }
                    else
                    {
                        tempIndex=str.indexOf('<a href=')
                        url.push(str.substring(tempIndex,str.indexOf('role="link">')))
                    }
            }
            let tempUrl=[];
           let temp;
           url.map((data)=>{
               if(data.indexOf('covid')>0 || data.indexOf('Covid')>0){
                   // console.log(data.substring(data.indexOf('/"/')))
                   temp=data.substring(data.indexOf('"')+1,data.length)
                   tempUrl.push(temp.substring(0,temp.indexOf('"')))
               }
           })
            this.setState({url:tempUrl})

            let newsHeading=[]
            tempUrl.map((data,index)=>{
                 this.getTitle(data).then((res)=>{
                    let str=res.data;
                     newsHeading.push(str.substring(str.indexOf('<h1 >')+5,str.indexOf('</h1>')))
                 })
            })


            this.getNewsHeading(tempUrl).then((res)=>{
                this.setState({newsHeading:res})
            })
        })
   }


    render() {
            return (
                <SafeAreaView style={{flex:1}}>
                    <View style={{flex:1}}>
                        <ScrollView style={{flex:1}}>
                        <View style={{height:h*.87,}}>
                        <ScrollView style={{flex:1}} nestedScrollEnabled={true}>
                    {this.state.newsHeading.map((data,index)=>{
                        return(
                            <View style={{height:h*0.13,width:w, backgroundColor:index%2==1 ?'#ECEDEE':'white',padding:h*.010}}>
                                <TouchableOpacity onPress={()=>this.showDetailNews(index)}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{fontSize:normalize(13)}}>{data.replace(/[^a-zA-Z ]/g, "")}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                        </ScrollView>
                        { this.state.showDetailNewsFlag &&
                        <Modal visible={true} animated={true} transparent={false}>
                            <SafeAreaView style={{flex:1}}>
                            <View style={{flex:1,}}>
                                <View style={{flex:1,justifyContent:'center',padding:h*.005}}>
                                    <TouchableOpacity onPress={()=>this.setState({showDetailNewsFlag:false})}><Text style={{fontSize:normalize(15)}}>Cancel</Text></TouchableOpacity>
                                </View>

                                <View style={{flex:9,borderTopWidth:h*.001,padding:10}}>
                                    <ScrollView style={{flex:1}}>
                                    {this.state.newsContentArray.map((data,index)=>{
                                        if(index<8)
                                            return(
                                                <View style={{marginTop:h*0.003}}>
                                                    <Text style={{fontSize:normalize(15)}}>{data}</Text>
                                                </View>
                                            )
                                    })}
                                    </ScrollView>

                                </View>
                           </View>
                            </SafeAreaView>

                        </Modal>
                        }

                    </View>
                        <View style={{height:h*.13,padding:h*0.010}}>
                            <Text style={{textAlign:'right',fontSize:normalize(12)}}>Source:-WHO(World health organization)</Text>
                        </View>
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
