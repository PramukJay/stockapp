angular.module('starter.services', [])

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
		return $http.get("http://127.0.0.1:8020/stockapp/stockapp/www/js/stock.xml");
		//return $http.get("http://councilofcoders.com/stock.xml");
	};
	return company;
})
.factory('newsItemsFactory', function($http){
	var company = [];
	company.getNewsRssFeed = function(){
		return $http.get("http://127.0.0.1:8020/stockapp/stockapp/www/js/news.html");
		//return $http.get("http://lk.duinvest.com/portal/LKCSE/rssStoryList.html");
	};
	return company;
});
