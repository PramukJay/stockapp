var base = "http://localhost:8000/api/v1/";

angular.module('starter.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */.factory('Menus', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var pages = [{
		url : '#/tab/market',
		name : 'Market Summary',
		icon : 'market'
	}, {
		url : '#/tab/announcements',
		name : 'Annoucement',
		icon : 'announcements'
	}, {
		url : '#/tab/pricelists',
		name : 'Price List',
		icon : 'pricelists'
	}, {
		url : '#/tab/gainerslosers',
		name : 'Gainers & Losers',
		icon : 'gainerslosers'
	}, {
		url : '#/tab/listedsecurities',
		name : 'Listed Securities',
		icon : 'listedsecurities'
	}, {
		url : '#/tab/myportfolio',
		name : 'My Portfolio',
		icon : 'myportfolio'
	}];

	return {
		all : function() {
			return pages;
		},
		get : function(pageURL) {
			// Simple index lookup
			return pages[pageURL];
		}
	};
})
.factory('stockFactory', function($http){
	var company = [];
	company.getRssFeed = function(){
		//return $http.get("http://127.0.0.1:8020/stockapp/www/js/stock.xml");
		//return $http.get("http://127.0.0.1:8020/stockapp/stockapp/www/js/stock.xml");
		return $http.get("http://councilofcoders.com/stock.xml");
	};
	return company;
})
.factory('newsItemsFactory', function($http){
	var company = [];
	company.getNewsRssFeed = function(){
		//return $http.get("http://127.0.0.1:8020/stockapp/www/js/news.html");
		//return $http.get("http://127.0.0.1:8020/stockapp/stockapp/www/js/news.html");
		return $http.get("http://lk.duinvest.com/portal/LKCSE/rssStoryList.html");
	};
	return company;
})
.factory('ForumFactory', function($http){
	var forum = [];
	forum.getRssFeed = function(){
		return $http.get("http://forum.srilankaequity.com/rss");
	};
	return forum;
})
.factory('UserProfile', function($resource){
	return{
		getPortfolio: function(){
			return $resource('http://104.131.20.63:3346/user/:username/:pass', {username: '@username', pass: '@pass'}, {
				get: {
					method: 'GET',
					params: {username: '@username', pass: '@pass'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*'}
				}
			});
		},
		
		getPortfolioDetails: function(){
			return $resource('http://104.131.20.63:3346//userdetails/:id', {id: '@id'}, {
				get: {
					method: 'GET',
					params: {id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*'}
				}
			});
		},
		
		getUserGames: function(){
			return $resource('http://104.131.20.63:3346//portfoliohome/:id', {id: '@id'}, {
				get: {
					method: 'GET',
					params: {id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*'}
				}
			});
		},
		
		getUserGamesDetails: function(){
			return $resource('http://104.131.20.63:3346//game/:gameid/:id', {gameid: '@gameid', id: '@id'}, {
				get: {
					method: 'GET',
					params: {gameid: '@gameid', id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*'}
				}
			});
		},
		
		getWatchList: function(){
			return $resource('http://104.131.20.63:3346//watchlist/:gameid/:id', {gameid: '@gameid', id: '@id'}, {
				get: {
					method: 'GET',
					params: {gameid: '@gameid', id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*'}
				}
			});
		},
		
		  getBuySellSecurities: function(){
			  return $resource('http://104.131.20.63:3346//buyandsell/', {
				  get: {
					  method: 'GET',
					  isArray: false
					  //headers:{'Access-Control-Allow-Origin':'*'}
				  }
			  });
		  }
	};
});
