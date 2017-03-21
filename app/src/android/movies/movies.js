//'use strict';

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
    TextInput,
    AsyncStorage,
    Alert
} from 'react-native';

//import MoviesDetails from './moviesDetails';

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
                    style={{
                        height: 95,
                        width: 75,
                        borderRadius: 20,
                        margin: 20
                    }}
                />;
            } else {
                image = <Image
                    source={{uri: rowData.pic}}
                    style={{
                        height: 95,
                        width: 75,
                        borderRadius: 20,
                        margin: 20
                    }}
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

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{fontWeight: 'bold', color: 'black'}}>{rowData.trackName}</Text>
                        <Text>{rowData.releaseDate.split('-')[0]}</Text>
                        <Text>{rowData.country}</Text>
                        <Text>{rowData.primaryGenreName}</Text>
                        <Text>{rowData.artistName}</Text>
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

        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

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
        var items = arr.filter((el) => el.trackName.toLowerCase().indexOf(text.toLowerCase()) >= 0);
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
            <View style={{flex: 1, justifyContent: 'center'}}>
				<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'darkblue'
							}}>
								Reload
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 20,
								textAlign: 'center',
								margin: 10,
								marginRight: 50,
								fontWeight: 'bold',
								color: 'black'
							}}>
								Movies
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							//onPress={()=> this.addUser()}
							underlayColor='#ddd'
						>
							<Text style={{
								fontSize: 16,
								textAlign: 'center',
								margin: 14,
								fontWeight: 'bold',
								color: 'black'
							}}>
							
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
			
                <View style={{marginTop: 0}}>
                    <TextInput style={{
                        height: 45,
						marginTop: 4,
                        padding: 5,
                        backgroundColor: 'whitesmoke',
                        borderWidth: 3,
                        borderColor: 'lightgray',
                        borderRadius: 0,
                    }}
                               onChangeText={this.onChangeText.bind(this)}
                               value={this.state.searchQuery}
                               placeholder="Search here">
                    </TextInput>

                    {errorCtrl}

                </View>

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

                <View style={{marginBottom: 0}}>
                    <Text style={styles.countFooter}>
                        {this.state.resultsCount} entries were found.
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
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'lightgray',
		color: 'black'
    },
    img: {
        height: 95,
        width: 75,
        borderRadius: 20,
        margin: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Movies;
