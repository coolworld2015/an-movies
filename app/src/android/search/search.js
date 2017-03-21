'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Switch
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchBase: true,
            eventSwitchTitle: true,
            textSwitchBase: 'Search in iTunes',
            textSwitchTitle: 'Search by title'
        }
    }

    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }
	
    showDetails(rowData) {
		this.props.navigator.push({
			index: 1,
			data: rowData
		});
    }
	
    onSearchPressed() {
        if (this.state.searchQuery == undefined ||
			this.state.searchQuery == '') {
            this.setState({
                invalidValue: true
            });
            return;
        }

        if (this.state.eventSwitchBase) {
			this.props.navigator.push({
				index: 1,
				data: {searchQuery: this.state.searchQuery}
			});
        } else {
			this.props.navigator.push({
				index: 3,
				data: {searchQuery: this.state.searchQuery}
			});
        }

    }

    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Search in iTunes'
            });
        } else {
            this.setState({
                textSwitchBase: 'Search in IMDB'
            });
        }
    }

    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        var validCtrl = <View />;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={this.clearSearch.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
							Search movies
						</Text>
                    </TouchableHighlight>

					<View style={styles.switchBlock}>
                        <View style={styles.switchItem}>
                            <Text style={styles.textItem}>
                                {this.state.textSwitchBase}
                            </Text>
                        </View>

                        <View
                            style={{
                                marginTop: 0
                            }}>
                            <Switch
                                onValueChange={(value) => {
                                    this.toggleTypeChange();
                                    this.setState({
                                        eventSwitchBase: value
                                    });
                                }}
                                value={this.state.eventSwitchBase}
                            />
                        </View>
                    </View>

                    <View style={styles.switchBlock}>
                        <View style={styles.switchItem}>
                            <Text style={styles.textItem}>
                                Search by title
                            </Text>
                        </View>

                        <View
                            style={{
                                marginTop: 0
                            }}>
                            <Switch
                                onValueChange={(value) => this.setState({
                                    eventSwitchTitle: value
                                })}
                                value={this.state.eventSwitchTitle}
                            />
                        </View>
                    </View>

                    <TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text)=> this.setState({
                            searchQuery: text,
                            invalidValue: false
                        })}
                        value={this.state.searchQuery}
                        style={styles.textInput}
                        placeholder="Search by title">
                    </TextInput>

                    {validCtrl}

                    <TouchableHighlight
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: 0,
		backgroundColor: 'white',
		paddingBottom: 155
    },
    textInput: {
        height: 50,
        marginTop: 10,
		paddingLeft: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 5,
        color: 'black',
        alignSelf: 'stretch'
    },
	switchBlock: {
		height: 50,
		marginTop: 10,
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#48BBEC',
		alignSelf: 'stretch',
		flex: 1,
		flexDirection: 'row'
	},
	switchItem: {
		marginTop: 3,
		flex: 1
	},		
	textItem: {
		fontSize: 18
	},		
	inputBlock: {
		height: 50,
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#48BBEC',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 5,
		paddingLeft: 6
	},		
    button: {
        height: 50,
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
        fontSize: 24,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Search;
