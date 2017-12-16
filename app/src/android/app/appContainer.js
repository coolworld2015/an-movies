import React, {Component} from 'react';
import {
	Navigator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Search from '../search/search';
import SearchResults from '../search/searchResults';
import SearchDetails from '../search/searchDetails';
import SearchIMDB from '../search/searchIMDB';

import Movies from '../movies/movies';
import MoviesDetails from '../movies/moviesDetails';

class AppContainer extends Component {
	constructor(props) {
		super(props);		
		
        App = {
            movies: {
                refresh: false
            }
        };		
	}
	
	render() {
		return (
			<ScrollableTabView 
				renderTabBar={() => <DefaultTabBar backgroundColor='white' />}
			>
				<SearchTab tabLabel="Search" />
				<MoviesTab tabLabel="Movies" />
			</ScrollableTabView>
		);
	}
}

class SearchTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Search', index: 0},
			{title: 'Search Results', index: 1},
			{title: 'Search Details', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Search routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <SearchResults data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <SearchDetails data={route.data} routes={this.routes} navigator={navigator} />
					break			
			case 3: return <SearchIMDB data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class MoviesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Movies', index: 0},
			{title: 'Movies Details', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Movies routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <MoviesDetails data={route.data} routes={this.routes} navigator={navigator} />
					break
 		}
 	}	
	
	render() {
		return (
	  		<Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

export default AppContainer;