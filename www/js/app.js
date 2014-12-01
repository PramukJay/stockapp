// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var userId = window.localStorage["userId"];
var userName = window.localStorage["userName"];
//exports.db = db;
angular.module('starter', ['ionic', 'ngCordova', 'starter.services'])

.run(function($ionicPlatform, $cordovaSQLite) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		db = $cordovaSQLite.openDB({ name: "my.db" });
    	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS marketshare (id integer primary key, name text, symbol text, isin text, sharevolume integer, prevclose real, high real, low real, lasttraded real, change real, changeperc real)");
	});
})
.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	// Each tab has its own nav history stack:
	.state('menu', {
		url : '/menu',
		templateUrl : 'templates/tab-menu.html',
		controller : 'MenusCtrl'
	})
	.state('price-list-detail', {
		url : '/detail/:compSymbol',
		templateUrl : 'templates/price-list-detail.html',
		controller : 'PriceListDetailCtrl'
	})
	.state('acc', {
		url : '/acc',
		templateUrl : 'templates/account.html',
		controller : 'HelpCtrl'
	})
	.state('market', {
		url : '/market',
		templateUrl : 'templates/market-summary.html',
		controller : 'MarketSummaryCtrl'
	})
	.state('announcements', {
		url : '/announcements',
		templateUrl : 'templates/announcement.html',
		controller : 'AnnouncementsCtrl'
	})
	.state('pricelists', {
		url : '/pricelists',
		templateUrl : 'templates/price-list.html',
		controller : 'PriceListCtrl'
	})
	.state('gainerslosers', {
		url : '/gainerslosers',
		templateUrl : 'templates/gainers-losers.html',
		controller : 'GainersLosersCtrl'
	})
	.state('listedsecurities', {
		url : '/listedsecurities',
		templateUrl : 'templates/listed-securities.html',
		controller : 'ListedSecuritiesCtrl'
	})
	.state('myportfolio', {
		url : '/myportfolio',
		templateUrl : 'templates/my-portfolio.html',
		controller : 'MyPortfolioCtrl'
	})
	.state('prof', {
		url : '/prof',
		templateUrl : 'templates/account.html',
		controller : 'HelpCtrl'
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/menu');

})
.controller('DashCtrl', function($scope, $cordovaSQLite, $ionicPopup, $ionicLoading, $timeout, stockFactory) {
	$scope.users = [];
	$scope.loginData = {};
	$scope.loading = false;
	
	////DB Test////
	$scope.insert = function(firstname, lastname) {
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            $scope.testData = res.insertId;
        }, function (err) {
            console.error(err);
        });
    };
	//////////////
	
	$scope.doLogin = function (){
		var userFound = false;
		if($scope.loginData.username && $scope.loginData.pwd){	
		stockFactory.getRssFeed().success(function(data){
			companies = x2js.xml_str2json(data);
            $scope.users = companies.stock.user;
            
             $scope.loading = true;
            
            for(var x = 0;x<$scope.users.length;x++){
            	if($scope.loginData.username === $scope.users[x].uname && $scope.loginData.pwd === $scope.users[x].password){
            		window.localStorage["userId"] = $scope.users[x].uid;
            		window.localStorage["userName"] = $scope.users[x].uname;
            		userId = window.localStorage["userId"];
            		userName = window.localStorage["userName"];
            		userFound = true;
            		break;
            	}
            }
            if(userFound){            	
            	window.location.href="menu.html#/menu";
            	//$scope.loading = false;
            }else{
            	$scope.loading = false;
            	$ionicPopup.alert({title: 'Stock App', template: 'Invalid User.'});
            	$scope.loginData.username = "";
            	$scope.loginData.pwd = "";
            }
		}).error(function(data, status, headers, config) {
			$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
	    }else{
	    	$ionicPopup.alert({title: 'Stock App', template: 'Please enter username and password.'});
	    }
	    
	};
})

.controller('MenusCtrl', function($scope, $ionicModal, $ionicPopup, Menus) {
	//$scope.menus = Menus.all();
	$ionicModal.fromTemplateUrl('templates/account.html', {
	   scope: $scope
	}).then(function(modal) {
	   $scope.modalAccount = modal;
	   
	});
	    
	//Open the account modal
	$scope.showAccount = function(){
		$scope.username = userName.toUpperCase();
		//$ionicPopup.alert({title: 'Stock App', template: 'test pop up'});
		$scope.modalAccount.show();
	};
	
	//Close the account modal
	$scope.hideAccount = function(){
		//$ionicPopup.alert({title: 'Stock App', template: 'test pop up'});
		$scope.modalAccount.hide();
	};
	
	//Logout
	$scope.logout = function(){
		window.localStorage.clear();
		window.location.href = "index.html#/tab/dash";
	};
})

.controller('PriceListDetailCtrl', function($scope, $stateParams, stockFactory) {
	$scope.compDetail = [];
	//$scope.menu = Menus.get($stateParams.compSymbol);
	$scope.menu = $stateParams.compSymbol;
	stockFactory.getRssFeed().success(function(data){
			$scope.testData = $scope.menu;
			companies = x2js.xml_str2json(data);
            $scope.stocks = companies.stock.company;
            $scope.testData = $scope.stocks.length;
            for(var x = 0;x<$scope.stocks.length;x++){
            	if($scope.menu === $scope.stocks[x].symbol){
            		$scope.compDetail = $scope.stocks[x];
            		break;
            	}
            }
		}).error(function(data, status, headers, config) {
			//$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
})

.controller('HelpCtrl', function($scope) {
	$scope.username = userName;
	$scope.logout = function(){
		window.localStorage.clear();
		window.location.href = "index.html#/tab/dash";
	};
})

.controller('MarketSummaryCtrl', function($scope, $cordovaSQLite, $interval, $http, stockFactory) {
	$scope.stocks = [];
	$scope.stockComps = [];
	$scope.loading = false;
	loadCompanies();
	loadMarketDetails();
	
	$interval(function(){
		loadMarketDetails();
	},5000);
	
	function loadMarketDetails(){
		$scope.loading = true;
		$scope.url = "http://222.165.133.165:8080/cses/json/market?code=gvt123";
		
		$http.get($scope.url).success(function(res, status){
			$scope.response = res;
			
		});
		$scope.loading = false;
	}
	
	
	function loadCompanies(){
		//$scope.loading = true;
		stockFactory.getRssFeed().success(function(data){
			companies = x2js.xml_str2json(data);
            $scope.stocks = companies.stock.company;
            /*$cordovaSQLite.execute(db, "DELETE FROM marketshare", []).then(function(res) {
		            //$scope.testRes = "deleted";
		    }, function (err) {
		            console.error(err);
		    });*/
            /*for(var x = 0;x<$scope.stocks.length;x++){
            	//$scope.testData = "inside for" + x;
            	var query = "INSERT INTO marketshare (name, symbol, isin, sharevolume, prevclose, high, low, lasttraded, change, changeperc) VALUES (?,?,?,?,?,?,?,?,?,?)";
            	$cordovaSQLite.execute(db, query, [$scope.stocks[x].name, $scope.stocks[x].symbol, $scope.stocks[x].isin, $scope.stocks[x].sharevolume, $scope.stocks[x].prevclose, $scope.stocks[x].high, $scope.stocks[x].low, $scope.stocks[x].lasttraded, $scope.stocks[x].change, $scope.stocks[x].changeperc]).then(function(res) {
		            console.log("INSERT ID -> " + res.insertId);
		            //$scope.testData = res.insertId;
		        }, function (err) {
		            console.error(err);
		        });
            }*/
            //displayCompanies();
		}).error(function(data, status, headers, config) {
			//$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
	    //$scope.loading = false;
	}
	function displayCompanies(){
		var query = "SELECT name, symbol, isin, sharevolume, prevclose, high, low, lasttraded, change, changeperc FROM marketshare";
		$cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
            	$scope.testRes = "found " + res.rows.length + " records" ;
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                //$scope.testData = res.rows.item(0).firstname + " " + res.rows.item(0).lastname;
                //$scope.stockComps = res.rows;
                //$scope.testRes = $scope.stockComps;
                for(var x = 0;x < res.rows.length;x++){
                	$scope.stockComps.push({
                		name: res.rows.item(x).name,
                		symbol: res.rows.item(x).symbol,
                		isin: res.rows.item(x).isin,
                		sharevolume: res.rows.item(x).sharevolume,
                		prevclose: res.rows.item(x).prevclose,
                		high: res.rows.item(x).high,
                		low: res.rows.item(x).low,
                		lasttraded: res.rows.item(x).lasttraded
                	});
                }
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
        $scope.loading = false;
	}
})
.controller('AnnouncementsCtrl', function($scope, newsItemsFactory) {
	$scope.newsItems = [];
	//$scope.loading = false;
	loadNewsItems();
	
	$scope.loading = true;
	function loadNewsItems(){
		newsItemsFactory.getNewsRssFeed().success(function(data){
			news = x2js.xml_str2json(data);
			$scope.testData = data;
			$scope.newsItems = news.rss.channel.item;
		});
	}
	$scope.loading = false;
})
.controller('PriceListCtrl', function($scope, stockFactory) {
	$scope.stocks = [];
	loadCompanies();
	
	function loadCompanies(){
		stockFactory.getRssFeed().success(function(data){
			$scope.testData = "data";
			companies = x2js.xml_str2json(data);
            $scope.stocks = companies.stock.company;
		}).error(function(data, status, headers, config) {
			//$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
	}
	function testFunc(){
		$scope.testData = "test is working";
	}
})
.controller('GainersLosersCtrl', function($scope) {
	
})
.controller('ListedSecuritiesCtrl', function($scope) {
	
})
.controller('MyPortfolioCtrl', function($scope) {
	$scope.username = userName;
});

