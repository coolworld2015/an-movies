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
    Alert
} from 'react-native';

class Movies extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            resultsCount: 0,
            recordsCount: 5,
            positionY: 0
        };

        this.getFavoritesMovies();
    }

    componentWillUpdate() {
        if (App.movies.refresh) {
            App.movies.refresh = false;

            this.setState({
                showProgress: true
            });

			setTimeout(() => {
				this.getFavoritesMovies()
			}, 1000);
        }
    }

    getFavoritesMovies() {
        AsyncStorage.getItem('rn-movies.movies')
            .then(req => JSON.parse(req))
            .then(json => {
				if (json) {
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(json.sort(this.sort).slice(0, 5)),
						resultsCount: json.length,
						responseData: json.sort(this.sort),
						filteredItems: json.sort(this.sort)
					});
				}
            })
            .catch(error => console.log(error))
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        var nameA = a.trackName.toLowerCase(), nameB = b.trackName.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }

    showDetails(rowData) {
		this.props.navigator.push({
			index: 1,
			data: rowData
		});
    }

    renderRow(rowData) {
        var image = <View />;
        if (rowData) {
            if (rowData.artworkUrl100) {
                image = <Image
                    source={{uri: rowData.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg')}}
                    style={styles.img}
                />;
            } else {
                image = <Image
                    source={{uri: rowData.pic}}
                    style={styles.img}
                />;
            }
        }
        return (
            <TouchableHighlight
                onPress={()=> this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.imgsList}>

                    {image}

                    <View style={styles.textBlock}>
                        <Text style={styles.textItemBold}>
							{rowData.trackName}
						</Text>
                        <Text style={styles.textItem}>
							{rowData.releaseDate.split('-')[0]}
						</Text>
                        <Text style={styles.textItem}>
							{rowData.country}
						</Text>
                        <Text style={styles.textItem}>
							{rowData.primaryGenreName}
						</Text>
                        <Text style={styles.textItem}>
							{rowData.artistName}
						</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress == true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -150) {

            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 5,
                positionY: 0,
                searchQuery: ''
            });
            setTimeout(() => {
                this.getFavoritesMovies()
            }, 1000);
        }

        if (this.state.filteredItems == undefined) {
            return;
        }

        var recordsCount = this.state.recordsCount;
        var positionY = this.state.positionY;
        var items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 550) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 5,
                positionY: positionY + 600
            });
        }
    }

    onChangeText(text) {
        if (this.state.responseData == undefined) {
            return;
        }
		
        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.trackName.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
	
	refreshDataAndroid() {
		this.setState({
			showProgress: true
		});

		setTimeout(() => {
			this.getFavoritesMovies()
		}, 1000);
	}
	
    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={{
                justifyContent: 'center',
                height: 100
            }}>
                <ActivityIndicator
                    size="large"
                    animating={true}/>
            </View>;
        }

        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								Reload
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
							onPress={()=> this.goBack()}
						>
							<Text style={styles.textLarge}>
								Movies
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
			
                <View>
                    <TextInput
						underlineColorAndroid='rgba(0,0,0,0)'
						onChangeText={this.onChangeText.bind(this)}
						style={styles.textInput}
						value={this.state.searchQuery}
						placeholder="Search here">
                    </TextInput>    			
				</View>
				
				{errorCtrl}

                {loader}

                <ScrollView
                    onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                    <ListView
						enableEmptySections={true}
                        style={{marginTop: 0, marginBottom: 0}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

				<View>
					<Text style={styles.countFooter}>
						Records: {this.state.resultsCount} 
					</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 10,
        margin: 20
    },    
	textBlock: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
    },	
	textItemBold: {
		fontWeight: 'bold', 
		color: 'black'
    },	
	textItem: {
		color: 'black'
    },
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
		marginRight: 60,
		fontWeight: 'bold',
		color: 'white'
	},		
	textInput: {
		height: 45,
		marginTop: 0,
		padding: 5,
		backgroundColor: 'white',
		borderWidth: 3,
		borderColor: 'lightgray',
		borderRadius: 0
	},		
	row: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},		
	rowText: {
		backgroundColor: '#fff', 
		color: 'black', 
		fontWeight: 'bold'
	},	
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
		color: 'white',
		fontWeight: 'bold'
    },
    loader: {
		justifyContent: 'center',
		height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Movies;