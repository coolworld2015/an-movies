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
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

console.disableYellowBox = true;

import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppContainer />
        )

    }
}

export default App;
