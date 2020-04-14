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
} from 'react-native';
import AppHeader from '../Component/appHeader'

const screenWidth = Dimensions.get('window').width;
class ExpandableItemComponent extends Component {
    constructor() {
        super();
        this.state = {
            layoutHeight: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item.isExpanded) {
            this.setState(() => {
                return {
                    layoutHeight: null,
                };
            });
        } else {
            this.setState(() => {
                return {
                    layoutHeight: 0,
                };
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.layoutHeight !== nextState.layoutHeight) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.props.onClickFunction}
                    style={styles.header}>
                    <Text style={styles.headerText}>{this.props.item.content.title}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        height: this.state.layoutHeight,
                        overflow: 'hidden',
                        backgroundColor: 'lightgray',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={{width: screenWidth * 0.3, height: screenWidth * 0.3}}
                            source={
                                this.props.item.content.urlToImage === null
                                    ? {uri: 'https://reactnative.dev/img/tiny_logo.png'}
                                    : {uri: this.props.item.content.urlToImage}
                            }
                        />
                        <View style={{width: screenWidth * 0.7}}>
                            <Text style={styles.text}>
                                <Text style={{fontWeight: 'bold'}}> {'Author : '} </Text>
                                {this.props.item.content.author}
                            </Text>
                            <View style={styles.separator} />

                            <Text style={styles.text}>
                                <Text style={{fontWeight: 'bold'}}> {'Published At : '} </Text>
                                {this.props.item.content.publishedAt}
                            </Text>
                            <View style={styles.separator} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>
                            {' '}
                            <Text style={{fontWeight: 'bold'}}>{'Description : '}</Text>
                            {this.props.item.content.description}
                        </Text>
                        <View style={styles.separator} />
                        <Text style={styles.text}>
                            <Text style={{fontWeight: 'bold'}}> {'Content : '}</Text>
                            {this.props.item.content.content}
                        </Text>
                        <View style={styles.separator} />
                    </View>
                </View>
            </View>
        );
    }
}
const NewsCotent = [];
export default class Indianewslist extends Component {
    //Main View defined under this Class
    constructor() {
        super();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.state = {
            listDataSource: [],
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }
    componentDidMount() {
        if (this.state.data.length == 0) {
            this.makeRemoteRequest();
            // console.log('str');
        }
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const url =
            'http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=d5fa370032ac4234b84fdbbe486a3da3';
        this.setState({loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.articles : [],
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                });
                console.log('My Data :' + res.status);
                for (let i = 0; i < this.state.data.length; i++) {
                    NewsCotent.push({
                        isExpanded: false,
                        content: this.state.data[i],
                    });
                }
                console.log('news' + NewsCotent);
                this.setState({
                    listDataSource: NewsCotent.length > 0 ? NewsCotent : [],
                });
                console.log('dat' + this.state.listDataSource);
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };
    updateLayout = index => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...this.state.listDataSource];
        array[index].isExpanded = !array[index].isExpanded;
        this.setState(() => {
            return {
                listDataSource: array,
            };
        });
    };

    render() {
        if (this.state.listDataSource.length > 0) {
            return (
                // <SafeAreaView>
                <SafeAreaView style={styles.safestyle}>
                    <View style={styles.viewstyle}>
                        <View style={styles.listView}>
                            <ScrollView>
                                {this.state.listDataSource.map((item, key) => (
                                    <ExpandableItemComponent
                                        key={item.content.title}
                                        onClickFunction={this.updateLayout.bind(this, key)}
                                        item={item}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                        <View />
                    </View>
                </SafeAreaView>
                // </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={styles.safestyle}>
                <View style={styles.viewstyle}>
                    <View style={styles.titleView}>
                        <Text style={styles.textview}>India News</Text>
                    </View>
                    <View style={styles.loadingView}>
                        <ActivityIndicator size={'large'} />
                    </View>
                    <View />
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
