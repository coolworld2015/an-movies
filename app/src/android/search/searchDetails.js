'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    AsyncStorage,
    Alert,
	BackAndroid
} from 'react-native';

class SearchDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});	
		
		this.state = {
			pushEvent: {
				trackName: '',
				releaseDate: ' - '
			}
		};
		
		if (props.data) {
			this.state = {
				pushEvent: props.data
			};
		}	
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
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var image = <View />;
		
		if (this.state.pushEvent) {
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
		}
		
        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={styles.itemWrap}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								{this.state.pushEvent.trackName}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.localStorageInsert()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								Add
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
							flex: 1,
							padding: 10,
							paddingBottom: 55,
							justifyContent: 'flex-start',
							backgroundColor: 'white'
					}}>
					<View style={{
						 alignItems: 'center'
					}}>
						{image}
					</View>
					
						<Text style={styles.itemTextBold}>
							{this.state.pushEvent.trackName}
						</Text>

						<Text style={styles.itemTextBold}>
							{this.state.pushEvent.releaseDate.split('-')[0]}
						</Text>

						<Text style={styles.itemTextBold}>
							{this.state.pushEvent.country}
						</Text>

						<Text style={styles.itemTextBold}>
							{this.state.pushEvent.primaryGenreName}
						</Text>

						<Text style={styles.itemTextBold}>
							{this.state.pushEvent.artistName}
						</Text>

						<Text style={styles.itemText}>
							{this.state.pushEvent.longDescription}
						</Text>
						
						<TouchableHighlight
							onPress={()=> this.localStorageInsert()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								Add to favorites
							</Text>
						</TouchableHighlight>
						
					</View>
				</ScrollView>
			</View>
		);
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		backgroundColor: 'white'
	},		
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#48BBEC',
		borderWidth: 0,
		borderColor: 'whitesmoke'
	},	
	textSmall: {
		fontSize: 16,
		textAlign: 'center',
		margin: 14,
		fontWeight: 'bold',
		color: 'white'
	},		
	textLarge: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		marginRight: 20,
		fontWeight: 'bold',
		color: 'white'
	},	
    form: {
		flex: 1,
		padding: 10,
		justifyContent: 'flex-start',
		paddingBottom: 130,
		backgroundColor: 'white'
    },
 	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
    itemTextBold: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
		color: 'black'
    },  
	itemText: {
		fontSize: 18,
		padding: 20,
		textAlign: 'center',
		color: 'black'
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
        fontSize: 20,
		fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchDetails;
