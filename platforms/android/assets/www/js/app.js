// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var userId = window.localStorage["userId"];
var userName = window.localStorage["userName"];
var json = window.localStorage["jsonObj"];
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
		//db = $cordovaSQLite.openDB({ name: "my.db" });
    	//$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS marketshare (id integer primary key, name text, symbol text, isin text, sharevolume integer, prevclose real, high real, low real, lasttraded real, change real, changeperc real)");
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
	.state('news', {
		url : '/news',
		templateUrl : 'templates/news.html',
		controller : 'NewsCtrl'
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
	window.location.href="menu.html#/menu";
	$scope.users = [];
	$scope.loginData = {};
	$scope.loading = false;
	window.location.href="menu.html#/menu";
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

.controller('MenusCtrl', function($scope, $ionicModal, $ionicPopup, $state, Menus) {
	//$scope.menus = Menus.all();
	//$state.reload();
	window.location.href="menu.html#/menu";
	
	$ionicModal.fromTemplateUrl('templates/account.html', {
	   scope: $scope
	}).then(function(modal) {
	   $scope.modalAccount = modal;
	   
	});
	    
	//Open the account modal
	$scope.showAccount = function(){
		$scope.username = userName.toUpperCase();
		$scope.modalAccount.show();
	};
	
	//Close the account modal
	$scope.hideAccount = function(){
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

.controller('MarketSummaryCtrl', function($scope, $cordovaSQLite, $interval, $http, $ionicLoading, $ionicPopup, stockFactory) {
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
  	
	//$scope.stocks = [];
	//$scope.stockComps = [];
	$scope.marketArr = [];
	//$scope.loading = false;
	//loadCompanies();
	loadMarketDetails();
	loadAspiSummary();
	loadSpslSummary();
	loadMarketSummary();
	var it = 0;
	var refresh = $interval(function(){
		//$scope.$apply(function(){
			loadMarketDetails();
			loadAspiSummary();
			loadSpslSummary();
			loadMarketSummary();
		//});
	},20000);
	
	var load = true;
	function loadMarketDetails(){
		var url = "http://222.165.133.165:8080/cses/json/market?code=gvt123";
		
		$http.get(url).success(function(res, status){
			$scope.response = res;
			var status = $scope.response.data.status;
			if(!(status == 'Regular Trading') & !(status == 'Market Close') & !(status == 'Trade Cancellation') & !(status == 'Closing Price Publication') & !(status == 'Post-Close')){
				$ionicPopup.alert({title: 'Stock App', template: 'Regular trading session will start at 9.30AM. Loading previous summary instead.'});
				//hide();
				$interval.cancel(refresh);
			}else{
				if(load){
					show();
					load = false;
				}				
			}
		});		
	}
	
	function loadAspiSummary(){
		var aspiUrl = "https://api.import.io/store/data/dbd81b89-b648-4ecf-bad7-2b735e03e9b4/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FindexDetails.html&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
		
		$http.get(aspiUrl).success(function(res, status){
			$scope.aspiResponse = res;
			$scope.aspi = res.results[1].column_1;
			$scope.aspi_change = res.results[2].column_2_number;
			
			//$scope.aspi_Val = $scope.aspiResponse.results;
			//$scope.testRes = $scope.aspiResponse.results.column_1;
		});
	}
	
	function loadSpslSummary(){
		var spslUrl = "https://api.import.io/store/data/f48fdfff-1d71-43cf-8437-76b7c0998ee6/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FindexDetails.html%3FindexId2%3D114%26goToHomePageParam%3Dtrue&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
		
		$http.get(spslUrl).success(function(res, status){
			$scope.spslResponse = res;
			$scope.spsl = res.results[1].column_1;
			$scope.spsl_change = res.results[2].column_2_number;
		});
	}
	
	function loadMarketSummary(){
		var marketSummaryUrl = "https://api.import.io/store/data/e7302ec9-f2d2-426c-a3db-82ec25a955df/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FindexDetails.html&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
		
		$http.get(marketSummaryUrl).success(function(res, status){
			$scope.marketResponse = res;
			$scope.marketArr = $scope.marketResponse.results;
			hide();
		});
	}
	
	
	$scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $interval.cancel(refresh);
      });
	
	
	/*
	function loadCompanies(){
		//$scope.loading = true;
		stockFactory.getRssFeed().success(function(data){
			companies = x2js.xml_str2json(data);
            $scope.stocks = companies.stock.company;
            /*$cordovaSQLite.execute(db, "DELETE FROM marketshare", []).then(function(res) {
		            //$scope.testRes = "deleted";
		    }, function (err) {
		            console.error(err);
		    });
            /*for(var x = 0;x<$scope.stocks.length;x++){
            	//$scope.testData = "inside for" + x;
            	var query = "INSERT INTO marketshare (name, symbol, isin, sharevolume, prevclose, high, low, lasttraded, change, changeperc) VALUES (?,?,?,?,?,?,?,?,?,?)";
            	$cordovaSQLite.execute(db, query, [$scope.stocks[x].name, $scope.stocks[x].symbol, $scope.stocks[x].isin, $scope.stocks[x].sharevolume, $scope.stocks[x].prevclose, $scope.stocks[x].high, $scope.stocks[x].low, $scope.stocks[x].lasttraded, $scope.stocks[x].change, $scope.stocks[x].changeperc]).then(function(res) {
		            console.log("INSERT ID -> " + res.insertId);
		            //$scope.testData = res.insertId;
		        }, function (err) {
		            console.error(err);
		        });
            }
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
        //$scope.loading = false;
	}
	*/
	//$scope.loading = false;
	//hide();
})
.controller('AnnouncementsCtrl', function($scope, $http, $ionicLoading) {

	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'

	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }

  	
	$scope.annArr = [];
	//$scope.loading = false;
	loadListedAnn();

	function loadListedAnn(){
		show();
		$scope.annUrl = "https://api.import.io/store/data/ccf82279-1b7c-45a6-b09e-414e0a4150b7/_query?input/webpage/url=http%3A%2F%2Fwww.cse.lk%2Fhome.do&_user=7c58bdf4-665f-4761-a763-617773526cf0&_apikey=8KU8WLfdRtBGOu8abE9V1V4dOJm%2FN9DiR5CszFaNvCXLTgpaBCfXmpY%2BtJtl2O1GjNoMR0YNDaSnEMremWseFg%3D%3D";
		
		$http.get($scope.annUrl).success(function(res, status){
			$scope.annResponse = res;
			$scope.annArr = $scope.annResponse.results;
			hide();
		});
	}
	
})
.controller('PriceListCtrl', function($scope,$interval, $http, $ionicLoading, $ionicPopup, stockFactory) {
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
	//$scope.stocks = [];
	$scope.marketArr = [];
	//loadCompanies();
	loadMarketDetails();
	loadPriceList();
	
	var refresh = $interval(function(){
		//$scope.$apply(function(){
			loadMarketDetails();
			loadMarketSummary();
		//});
	},20000);
	
	var load = true;
	var load = true;
	function loadMarketDetails(){
		var url = "http://222.165.133.165:8080/cses/json/market?code=gvt123";
		
		$http.get(url).success(function(res, status){
			$scope.response = res;
			var status = $scope.response.data.status;
			if(!(status == 'Regular Trading') & !(status == 'Market Close') & !(status == 'Trade Cancellation')){
				$ionicPopup.alert({title: 'Stock App', template: 'Regular trading session will start at 9.30AM. Loading previous data instead.'});
				$interval.cancel(refresh);
			}else{
				if(load){
					show();
					load = false;
				}				
			}
		});		
	}
	
	function loadPriceList(){
		var marketSummaryUrl = "https://api.import.io/store/data/960917f1-b230-4ad3-9dcb-d2635d37f736/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FlistAllStocksPrices.html&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
		
		$http.get(marketSummaryUrl).success(function(res, status){
			$scope.marketResponse = res;
			$scope.marketArr = $scope.marketResponse.results;
			console.log($scope.marketArr);
			hide();
		});	
	}
	
	function loadCompanies(){
		stockFactory.getRssFeed().success(function(data){
			$scope.testData = "data";
			companies = x2js.xml_str2json(data);
            $scope.stocks = companies.stock.company;
		}).error(function(data, status, headers, config) {
			console.log("Auth.signin.error!");
	    });
	}
	
	$scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $interval.cancel(refresh);
      });
	
})
.controller('NewsCtrl', function($scope, $ionicLoading, newsItemsFactory) {
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
	$scope.newsItems = [];
	loadNewsItems();
	
	function loadNewsItems(){
		show();
		newsItemsFactory.getNewsRssFeed().success(function(data){
			news = x2js.xml_str2json(data);
			$scope.testData = data;
			$scope.newsItems = news.rss.channel.item;
			hide();
		});
		
	}	
})
.controller('ListedSecuritiesCtrl', function($scope,$http, $ionicLoading) {
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }

	$scope.secutiryArr = [];
	$scope.loading = false;
	loadListedsSequrities();
	
	show();
	function loadListedsSequrities(){

		$scope.sequrityUrl = "https://api.import.io/store/data/e7302ec9-f2d2-426c-a3db-82ec25a955df/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FindexDetails.html&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
		
		
		$http.get($scope.sequrityUrl).success(function(res, status){
			$scope.sequrityResponse = res;
			$scope.secutiryArr = $scope.sequrityResponse.results;
			hide();
		});
		
		$scope.loading = false;
	}
	
})
.controller('MyPortfolioCtrl', function($scope) {
	$scope.username = userName;
});
