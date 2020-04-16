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
            newsImageArray:[],
            showDetailNewsFlag:false,
            tempIndex:0,
            renderFlag:true,
            currentImage:''
        }
    }
    getNews=()=>{
        return new Promise((resolve=>{
            axios.get("https://timesofindia.indiatimes.com/india")
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }


    getTitle=(url)=>{
        let finalurl="https://timesofindia.indiatimes.com/"+url;
        return new Promise((resolve=>{
            axios.get(finalurl)
                .then((res)=>{
                    return resolve(res);
                });
        }))
    }

    getNewContent=(newsHeadlineArray)=>{
        return new Promise((resolve=>{
            let urldata='https://timesofindia.indiatimes.com'
            let tempNewsArray=[]
            let tempImageArray=[]
            let tempUrl='';
            let i=0;
            newsHeadlineArray.map((data,index)=>{
                tempUrl=urldata+data
                if(index<17) {
                    axios.get(tempUrl)
                        .then((res)=>{
                            let str=res.data;
                            let imgStr=res.data;
                            let tempImageURl=''
                            tempImageURl=imgStr.substring(imgStr.indexOf('<meta property="og:image"'),imgStr.indexOf('<meta property="og:image"')+200)
                            tempImageArray.push(tempImageURl.substring(tempImageURl.indexOf('"',25)+1,tempImageURl.indexOf('"',50)))

                            let tempNews=str.substring(str.indexOf('<div class="_3WlLe clearfix  ">'),str.length)
                            tempNews=tempNews.substring(0,str.lastIndexOf('<br/>')).replace( /(<([^>]+)>)/ig, '')
                            tempNews=tempNews.split(".")
                            tempNewsArray.push({news:tempNews,image:tempImageArray[i]})
                            i=i+1
                             if(index==15)
                            {
                                return resolve(tempNewsArray);
                            }

                        });
                }
            })

        }))

    }
    showDetailNews=(data,index)=>{
           this.setState({showDetailNewsFlag:true,tempIndex:data})
            this.setState({currentImage:this.state.newsImageArray[index]})
    }
    componentDidMount(): void {
        this.getNews().then((res)=> {
            let str = res.data;
            let news;
            news=str.substring(str.lastIndexOf('<ul class="list5 clearfix" data-msid="-2128936835">'),str.length)
            var count = (news.match(/<a href=/g) || []).length;

            var regex = /<a href=/gi, result, indices = [];
            while ( (result = regex.exec(news)) ) {
                indices.push(result.index);
            }
            let url=[]
            for(let i=0;i<count;i++)
            {
                let temp=news.substring(indices[i],news.length)
                url.push(temp.substring(9,temp.indexOf('"',10)))
            }
            this.getNewContent(url).then((res)=>{
                let tempNewsArray=[]
                let tempImageArray=[]
                res.map((data,index)=>{
                    tempNewsArray.push(data.news)
                    tempImageArray.push(data.image)
                })

                this.setState({newsContentArray:tempNewsArray,newsImageArray:tempImageArray})
                this.setState({renderFlag:false})
            })
        })
   }

    render() {
        const {
            newsHeadinListView,
            sourceTitle


        } = style;

            return (
                <SafeAreaView style={{flex:1}}>
                    <View style={{flex:1}}>
                    <ScrollView style={{flex:1}}>
                    {
                        this.state.newsContentArray.map((data,index)=>{
                            if(data[0].substring(0,5)!=''){
                            return(
                                <TouchableOpacity onPress={()=>this.showDetailNews(data,index)}>
                                <View style={[newsHeadinListView,{backgroundColor:index%2==1 ?'#ECEDEE':'white',}]}>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{fontSize:normalize(15)}}>{data[0].replace(/[^a-zA-Z0-9 ]/g, "")}</Text>
                                </View>
                                </TouchableOpacity>
                            )}
                        })
                    }
                        <Text style={sourceTitle}>Source:-TOI(Times of India)</Text>
                            { this.state.showDetailNewsFlag &&
                            <Modal visible={true} animated={true} transparent={false}>
                                <SafeAreaView style={{flex:1}}>
                                    <ScrollView style={{flex:1}}>
                                <View style={{flex:1,}}>
                                    <View style={{flex:1,padding:h*.010,}}>
                                        <TouchableOpacity onPress={()=>this.setState({showDetailNewsFlag:false})}><Text style={{fontSize:normalize(15)}}>Cancel</Text></TouchableOpacity>
                                        <Image
                                            style={{width: w, height: h*0.40,marginTop:h*.020}}
                                            source={{uri: this.state.currentImage}}
                                        />
                                        <View style={{marginTop:h*0.020,padding:h*0.010}}>
                                            {this.state.tempIndex.map((data,index)=>{
                                                if(index<6){
    return(
        <View style={{marginTop:h*.0005}}>
            <Text style={{fontSize:normalize(15),textAlign:'left'}}>{data.replace(/[^a-zA-Z0-9 ]/g, "").trim()}</Text>
        </View>
    )}
})}
</View>
</View>
</View>
</ScrollView>
</SafeAreaView>

</Modal>
}

{ this.state.renderFlag &&
<Modal visible={true} animated={false} transparent={true}>
<SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
<ActivityIndicator size="large" color="black" animating={this.state.renderFlag}  />
</SafeAreaView>
</Modal>
}
</ScrollView>
</View>
</SafeAreaView>
);
}
}

const style = StyleSheet.create({
newsHeadinListView:{
    height:h*.13,marginTop:h*0.010,padding:h*0.015,
},
    sourceTitle:{
        textAlign:'right',fontSize:normalize(12),padding:h*0.020
    }
});
