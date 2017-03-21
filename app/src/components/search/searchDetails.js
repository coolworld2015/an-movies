'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
    AsyncStorage,
    Alert
} from 'react-native';

class SearchDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pushEvent: props.pushEvent
        };
    }

    localStorageInsert() {
        var movies = [];

        AsyncStorage.getItem('rn-movies.movies')
            .then(req => JSON.parse(req))
            .then(json => {
                movies = [].concat(json);
                movies.push(this.state.pushEvent);

                if (movies[0] == null) {
                    movies.shift()
                } // Hack !!!

                AsyncStorage.setItem('rn-movies.movies', JSON.stringify(movies))
                    .then(json => {
                            App.movies.refresh = true;
                            this.props.navigator.pop();
                        }
                    );

            })
            .catch(error => console.log(error));
    }

    render() {
        var image = <View />;

        if (this.state.pushEvent.artworkUrl100) {
            image = <Image
                source={{uri: this.state.pushEvent.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
                style={{
                    height: 300,
                    width: 200,
                    borderRadius: 20,
                    margin: 20
                }}
            />;
        } else {
            image = <Image
                source={{uri: this.state.pushEvent.pic}}
                style={{
                    height: 300,
                    width: 200,
                    borderRadius: 20,
                    margin: 20
                }}
            />;
        }

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingTop: 20,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                    {image}

                    <Text style={styles.welcome1}>
                        {this.state.pushEvent.trackName}
                    </Text>

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.releaseDate.split('-')[0]}
                    </Text>

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.country}
                    </Text>

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.primaryGenreName}
                    </Text>

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.artistName}
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        padding: 20,
                        textAlign: 'justify'
                    }}>
                        {this.state.pushEvent.longDescription}
                    </Text>

                    <TouchableHighlight
                        onPress={this.localStorageInsert.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Add to favorites</Text>
                    </TouchableHighlight>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome1: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        margin: 10,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});

export default SearchDetails;
