var base = "http://104.131.20.63:3346/";

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
			return $resource(base+'user/:username/:pass', {username: '@username', pass: '@pass'}, {
				get: {
					method: 'GET',
					params: {username: '@username', pass: '@pass'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				}
			});
		},
		
		getPortfolioDetails: function(){
			return $resource(base+'userdetails/:id', {id: '@id'}, {
				get: {
					method: 'GET',
					params: {id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				}
			});
		},
		
		getUserGames: function(){
			return $resource(base+'portfoliohome/:id', {id: '@id'}, {
				get: {
					method: 'GET',
					params: {id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				}
			});
		},
		
		getUserGamesDetails: function(){
			return $resource(base+'game/:gameid/:id', {gameid: '@gameid', id: '@id'}, {
				get: {
					method: 'GET',
					params: {gameid: '@gameid', id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				}
			});
		},
		
		getWatchList: function(){
			return $resource(base+'watchlist/:gameid/:id', {gameid: '@gameid', id: '@id'}, {
				get: {
					method: 'GET',
					params: {gameid: '@gameid', id: '@id'},
					isArray: false
					//headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				}
			});
		},
		
		  getBuySellSecurities: function(){
			  return $resource(base+'buyandsell/:gameid/:userid', {gameid: '@gameid', userid: '@userid'}, {
				  get: {
					  method: 'GET',
					  params: {gameid: '@gameid', userid: '@userid'},
					  isArray: false
					 // headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				  }
			  });
		  },
		  
		  getBuySellSecurityDetails: function(){
			  return $resource(base+'buy/:gameid/:userid/:sid', {gameid: '@gameid', userid: '@userid', sid: '@sid'}, {
				  get: {
					  method: 'GET',
					  params: {gameid: '@gameid', userid: '@userid', sid: '@sid'},
					  isArray: false
					 // headers:{'Access-Control-Allow-Origin':'*', 'X-Auth-Token' : 'u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ'}
				  }
			  });
		  },
		  
		  setWatchlist: function(){
		  	return $resource(base+'/addtowatchlist/:gameid/:userid/:sid', {gameid: '@gameid', userid: '@userid', sid: '@sid'}, {
		  		get: {
		  			method: 'GET',
		  			params: {gameid: '@gameid', userid: '@userid', sid: '@sid'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  deleteWatchlist: function(){
		  	return $resource(base+'/removefromwatchlist/:gameid/:userid/:sid', {gameid: '@gameid', userid: '@userid', sid: '@sid'}, {
		  		get: {
		  			method: 'GET',
		  			params: {gameid: '@gameid', userid: '@userid', sid: '@sid'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  buySecurity: function(){
		  	return $resource(base+'/buysellstock/:gameid/:userid/:sid/:ttype/:qty/:total/:mprice', {gameid: '@gameid', userid: '@userid', sid: '@sid', ttype: '@ttype', qty: '@qty', total: '@total', mprice: '@mprice'}, {
		  		get: {
		  			method: 'GET',
		  			params: {gameid: '@gameid', userid: '@userid', sid: '@sid', ttype: '@ttype', qty: '@qty', total: '@total', mprice: '@mprice'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getLeaderboard: function(){
		  	return $resource(base+'/leaderboard/:gameid', {gameid: '@gameid'}, {
		  		get: {
		  			method: 'GET',
		  			params: {gameid: '@gameid'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getShareTransactions: function(){
		  	return $resource(base+'/sharetransactions/:userid/:gameid', {userid: '@userid', gameid: '@gameid'}, {
		  		get: {
		  			method: 'GET',
		  			params : {userid: '@userid', gameid: '@gameid'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getGainLoose: function(){
		  	return $resource(base+'/gainlossreport/:userid/:gameid/:from/:to', {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'}, {
		  		get: {
		  			method: 'GET',
		  			params: {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getTransactionHistory: function(){
		  	return $resource(base+'/transactionhistory/:userid/:gameid/:from/:to', {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'}, {
		  		get: {
		  			method: 'GET',
		  			params: {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getCashMovement: function(){
		  	return $resource(base+'/cashmovement/:userid/:gameid/:from/:to', {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'}, {
		  		get: {
		  			method: 'GET',
		  			params: {userid: '@userid', gameid: '@gameid', from: '@from', to: '@to'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getValuation: function(){
		  	return $resource(base+'/portfoliovaluation/:userid/:gameid/:date', {userid: '@userid', gameid: '@gameid', date: '@date'}, {
		  		get: {
		  			method: 'GET',
		  			params: {userid: '@userid', gameid: '@gameid', date: '@date'},
		  			isArray:false
		  		}
		  	});
		  },
		  
		  getActiveInvestors: function(){
		  	return $resource(base+'/activeinvestors/:gameid', {gameid: '@gameid'}, {
		  		get: {
		  			method: 'GET',
		  			params: {gameid: '@gameid'},
		  			isArray:false
		  		}
		  	});
		  }
	};
});
