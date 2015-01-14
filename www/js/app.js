var db = null;
var userId = window.localStorage["userID"];
var userName = window.localStorage["realName"];
var status = window.localStorage["status"];
var gameID = window.localStorage["gameID"];
var pageName = window.localStorage["pageName"];
var json = window.localStorage["jsonObj"];
window.localStorage["token"] = "u7WSOkQC5FKUxpm9B2ykQpDea38Hs5soUYFnC0oJ";
angular.module('starter', ['ionic', 'ngCordova', 'starter.services'])

.run(function($ionicPlatform, $cordovaSQLite, $ionicPopup) {
	$ionicPlatform.ready(function() {
		
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
		if(window.Connection){
			if(navigator.connection.type == Connection.NONE){
				$ionicPopup.confirm({
					title: "Internet Disconnected",
					content: "This application requires a working internet connection."
				})
				.then(function(result){
					if(result || !result){
						ionic.Platform.exitApp();
					}
				});
			}
		}
		
	});
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	
	$stateProvider
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
	
	.state('portfoliohome', {
		url : '/portfoliohome/:userID',
		templateUrl : 'templates/portfolio-home.html',
		controller : 'PortfolioHomeCtrl'
	})
	.state('prof', {
		url : '/prof',
		templateUrl : 'templates/account.html',
		controller : 'HelpCtrl'
	})
	.state('gainlose', {
		url :'/gainers-losers',
		templateUrl : 'templates/gain-loose.html',
		controller : 'GainersLosersCtrl'
	})
	.state('newsannouncement', {
		url :'/news-announcement',
		templateUrl : 'templates/news-announcements.html',
		controller : 'NewsAnnouncementsCtrl'
	})
	.state('research', {
		url :'/research',
		templateUrl : 'templates/research.html',
		controller : 'ResearchCtrl'
	})
	.state('forum', {
		url :'/forum',
		templateUrl : 'templates/forum.html',
		controller : 'ForumCtrl'
	})
	.state('tab', {
	    url: "/tab",
	    abstract: true,
	    templateUrl: "templates/tabs.html",
	    controller: "TabCtrl"
	  })
	  .state('tab.portfoliodetails', {
	    url: '/portfoliodetails/:gameid/:pagename',
	    views: {
	      'tab-portfoliodetails': {
	        templateUrl: 'templates/portfolio-details.html',
	        controller: 'PortfolioDetailsCtrl'
	      }
	    }
	  })
	   .state('tab.buyandsell', {
	    url: '/buyandsell',
	    views: {
	      'tab-buyandsell': {
	        templateUrl: 'templates/tab-buyandsell.html',
	        controller: 'BuyAndSellCtrl'
	      }
	    }
	  })
	  .state('tab.watchlist', {
	    url: '/watchlist',
	    views: {
	      'tab-watchlist': {
	        templateUrl: 'templates/tab-watchlist.html',
	        controller: 'WatchlistCtrl'
	      }
	    }
	  });

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/menu');

})

.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
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
            	$ionicPopup.alert({title: 'VCE', template: 'Invalid User.'});
            	$scope.loginData.username = "";
            	$scope.loginData.pwd = "";
            }
		}).error(function(data, status, headers, config) {
			$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
	    }else{
	    	$ionicPopup.alert({title: 'VSE', template: 'Please enter username and password.'});
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
				$ionicPopup.alert({title: 'VSE', template: 'Regular trading session will start at 9.30AM. Loading previous summary instead.'});
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
				$ionicPopup.alert({title: 'VSE', template: 'Regular trading session will start at 9.30AM. Loading previous data instead.'});
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
			
		}).error(function(data, status) {
			//console.log("Auth.signin.error!");
			//$scope.testData = "Error";
	    });
		
		$scope.loading = false;
	}
	
})
.controller('MyPortfolioCtrl', function($scope, $ionicPopup, $state, $ionicLoading, UserProfile) {
	
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    
	$scope.username = userName;
	$scope.loginData = {};
	
	checkUserLoggedIn();
	
	function checkUserLoggedIn(){
		if(window.localStorage["userID"] != null){
			//window.location.href="vstoxPortfolio.html";
			//window.location.href="menu.html#/portfoliodetails/" + userId + "/" + userName + "/" + status;
			//window.location.href="vstoxPortfolio.html#/portfoliodetails/" + userId + "/" + userName + "/" + status;
			window.location.href="vstoxPortfolio.html#/portfoliohome/" + userId;
		}
	}
	
	$scope.loadUser = function(){
		
		if($scope.loginData.username && $scope.loginData.pass){
			show();
			var usr = UserProfile.getPortfolio();
			//$ionicPopup.alert({title: 'Stock App', template: 'inside method'});
			usr.get({username:$scope.loginData.username, pass:$scope.loginData.pass}, function(data){	
				if(data.user.length > 0){
				hide();		
					//$ionicPopup.alert({title: 'Stock App', template: 'success '});
					//window.location.href="menu.html#/portfoliodetails/" + data.user[0].id + "/" + data.user[0].real_name + "/" + data.user[0].player_status;
					//window.location.href="vstoxPortfolio.html#/portfoliodetails/" + data.user[0].id + "/" + data.user[0].real_name + "/" + data.user[0].player_status;
					window.location.href="vstoxPortfolio.html#/portfoliohome/" + data.user[0].id;
					
					
					window.localStorage["userID"] = data.user[0].id;
					userId = window.localStorage["userID"];
					window.localStorage["realName"] = data.user[0].real_name;
					userName = window.localStorage["realName"];
					window.localStorage["status"] = data.user[0].player_status;
					status = window.localStorage["status"];
					//window.location.href="vstoxPortfolio.html";
				}else{
					hide();
					$ionicPopup.alert({title: 'VSE', template: 'Invalid login details.'});
					$scope.loginData.username = "";
					$scope.loginData.pass = "";
				}
			}, function(error){
				hide();
				$ionicPopup.alert({title: 'VSE', template: 'error '+error});
			});
		}else{
			$ionicPopup.alert({title: 'VSE', template: 'Please enter username & password.'});
		}
	};
	
	
})
.controller('GainersLosersCtrl', function($scope, $http, $ionicLoading){
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    show();
	$scope.gainersArr = [];
	$scope.gainersURL = "https://api.import.io/store/data/df56d5b8-f4af-48cf-b553-ea44f47749d6/_query?input/webpage/url=http%3A%2F%2Flk.duinvest.com%2Fportal%2FLKCSE%2FhomePage.html&_user=a2cae542-39a3-445b-91fb-7924849050c9&_apikey=Y%2BumIeebILxqCQPBxz79RKlNNpyTIrFVtA3JYUjE%2FOgupkWJC4g%2FWX8BYAGhQ2%2BLEzqRm1yo%2BzFnbNnEp7xerg%3D%3D";
	
	$http.get($scope.gainersURL).success(function(res, status){
		$scope.gainersArr = res.results;
		hide();
	});
})
.controller('NewsAnnouncementsCtrl', function($scope){
	
})
.controller('ResearchCtrl', function($scope, $http, $ionicLoading){
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    show();
	$scope.researchArr = [];
	$scope.researchURL = "https://api.import.io/store/data/571844c7-f476-450c-975f-b1ba64b96aaf/_query?input/webpage/url=http%3A%2F%2Fresearch.srilankaequity.com%2F&_user=7c58bdf4-665f-4761-a763-617773526cf0&_apikey=8KU8WLfdRtBGOu8abE9V1V4dOJm%2FN9DiR5CszFaNvCXLTgpaBCfXmpY%2BtJtl2O1GjNoMR0YNDaSnEMremWseFg%3D%3D";
	$http.get($scope.researchURL).success(function(res, status){
		$scope.researchArr = res.results;
		hide();
	});
})
.controller('ForumCtrl', function($scope, $http, $ionicLoading, ForumFactory){
	var tag_begin = '<table class="default" id="tbl">';
	var tag_end = '</table>';
	var inner_tags = '';
	function show() {
	    $ionicLoading.show({
	      template: '<span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    
	$scope.forumFeed = [];
	show();
	ForumFactory.getRssFeed().success(function(data){
			$scope.testData = $scope.menu;
			feed = x2js.xml_str2json(data);
            $scope.forumFeed = feed.rss.channel.item;
            for(var i = 0;i<$scope.forumFeed.length;i++){
            	inner_tags = inner_tags + '<tr><td style="font-size: 14px; text-align: left; max-width: 100px;">' + $scope.forumFeed[i].title + '</td></tr>';
            	inner_tags = inner_tags + '<tr><td style="font-size: 10px; text-align: left; max-width: 100px;">' + $scope.forumFeed[i].description + '</td></tr>';
            }
            $scope.output = tag_begin + inner_tags + tag_end;
            hide();
            //$scope.testData = $scope.forumFeed[0].title;
            
		}).error(function(data, status, headers, config) {
			//$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
})
.controller('PortfolioDetailsCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $stateParams, UserProfile){
	//$ionicPopup.alert({title: 'Stock App', template: 'Inside Method'});
	function show() {
	    $ionicLoading.show({
	      template: 'Loading your profile<br/><span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    $scope.page_name = $stateParams.pagename;
    $scope.gameid = $stateParams.gameid;
    //$ionicPopup.alert({title: 'Stock App', template: $scope.page_name + " " + $scope.gameid});
    //$ionicPopup.alert({title: 'Stock App', template: $scope.gameid});
	$scope.user_id = window.localStorage["userID"];
	$scope.real_name = window.localStorage["realName"];
	$scope.player_status = window.localStorage["status"];
	$scope.securitiesArr = [];
	var tot_share_port_val = 0;
	
	loadDetails();
	
	function loadDetails(){
		$scope.userid = window.localStorage["userID"];
		show();
		var usr = UserProfile.getUserGamesDetails();
		usr.get({gameid:$scope.gameid, id:$scope.userid}, function(data){
			console.log(data);
			$scope.securitiesArr = data.game_data;
			$scope.realName = $scope.real_name; 
			$scope.status = $scope.player_status;
			console.log(data);
			$scope.buying_power = data.user_balance[0].buying_power;
			$scope.bank_balance = data.user_balance[0].bank_balance;
			$scope.ranking = data.user_ranking[0].rank;
			
			for(var i = 0;i<data.game_data.length;i++){
				tot_share_port_val = tot_share_port_val + (data.game_data[i].last_trade_price * data.game_data[i].position);
			}
			$scope.totalSharePortValue = tot_share_port_val;
			var tot_port_val = parseFloat(tot_share_port_val);
			var bank_bal = parseFloat(data.user_balance[0].bank_balance);
			$scope.totalPortfolioValue = tot_port_val+ bank_bal;
			hide();
			//$ionicPopup.alert({title: 'Stock App', template: $scope.securitiesArr});
		}, function(error){
			$ionicPopup.alert({title: 'VSE', template: 'error '+error});
		});
	}
	
	$scope.logout = function(){
		show();
		window.localStorage.clear();
		hide();	
		window.location.href="menu.html#/menu";
	};
	
	$scope.showHome = function(){
		window.location.href="menu.html#/menu";
	};
	$scope.showPortfolioHome = function(){
		window.location.href="vstoxPortfolio.html#/portfoliohome/" + window.localStorage["userID"];
	};
})
.controller('PortfolioHomeCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $stateParams, UserProfile){
	$scope.user_id = $stateParams.userID;
	
	$scope.gamesArr = [];
	
	function show() {
	    $ionicLoading.show({
	      template: 'Loading<br/><span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    getGames();
    show();
    
    function getGames(){
    	var usr = UserProfile.getUserGames();
    	
    	usr.get({id:$scope.user_id}, function(data){
			//$ionicPopup.alert({title: 'Stock App', template: 'success '});
			$scope.gamesArr = data.user_reg_games;
			
			hide();	
			//$ionicPopup.alert({title: 'Stock App', template: $scope.securitiesArr});
		}, function(error){
			$ionicPopup.alert({title: 'VSE', template: 'error '+error});
		});
    }
    
    $scope.redirectToTabs = function(game_id, pg_name){
    	//$ionicPopup.alert({title: 'Stock App', template: game_id + " " + pg_name });
    	window.localStorage["gameID"] = game_id;
    	gameID = window.localStorage["gameID"];
    	window.localStorage["pageName"] = pg_name;
    	pageName = window.localStorage["pageName"];
    	window.location.href = "#/tab/portfoliodetails/"+gameID+"/"+pageName;
    	//$ionicPopup.alert({title: 'Stock App', template: gameID + " " + pageName });
    };
    
    $scope.logout = function(){
		show();
		window.localStorage.clear();
		hide();	
		window.location.href="menu.html#/menu";
	};
	
	$scope.showHome = function(){
		window.location.href="menu.html#/menu";
	};
    
})
.controller('TabCtrl', function($scope, $ionicPopup){
	
	$scope.gameid = window.localStorage["gameID"];
	$scope.page_name = window.localStorage["pageName"];
	//$ionicPopup.alert({title: 'Stock App', template: 'Hello Tabs<br>' + $scope.gameid + " " + $scope.page_name});
})
.controller('BuyAndSellCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $stateParams, $ionicModal, UserProfile){
	$scope.secArr = [];
 
 	   
    
	  function show() {
	      $ionicLoading.show({
	        template: 'Loading securities<br/><span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	      });
	     }
	     function hide(){
	      $ionicLoading.hide();
	     }
	     loadBuySellSecurities();
	     show();
	     
	     function loadBuySellSecurities(){
	      var sec = UserProfile.getBuySellSecurities();
	      
	      sec.get(function(data){
	    //$ionicPopup.alert({title: 'Stock App', template: 'success '});
	    $scope.secArr = data.securities;
	    
	    hide(); 
	    
	   }, function(error){
	    $ionicPopup.alert({title: 'VSE', template: 'error '+error});
	   });
     }
     
     //Creating the buy and sell modal
 	$ionicModal.fromTemplateUrl('templates/security-buy-and-sell.html', {
    	scope: $scope,
    	animation: 'slide-in-right'
    }).then(function(modal) {
    	$scope.modal = modal;
    });
    
    //Closing the buy and sell modal
    $scope.closeBuySell = function() {
    	$scope.modal.hide();
    	
    };
    
    //Open the buy and sell modal
    $scope.showBuySell = function(security) {
    	$scope.modal.show();
    	
    	$scope.securityDetailsArr = [];
    	show();
    	
    	var sec = UserProfile.getBuySellSecurityDetails();
    	sec.get({gameid:window.localStorage["gameID"],userid:window.localStorage["userID"], sid:security}, function(data){
    		$scope.securityDetailsArr = data.share_history;
    		$scope.symbol = security;
    		$scope.name = data.user_details[0].real_name;
    		$scope.address = data.user_details[0].address;
    		$scope.buying_power = data.buying_power[0].buying_power;
    		
    		hide();
    	}, function(error){
	    $ionicPopup.alert({title: 'VSE', template: 'error '+error});
	   });
    };
	
	$scope.showPortfolioHome = function(){
		window.location.href="vstoxPortfolio.html#/portfoliohome/" + window.localStorage["userID"];
	};
	
})
.controller('WatchlistCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $stateParams, UserProfile){
	$scope.game_id = window.localStorage["gameID"];
	$scope.user_id = window.localStorage["userID"];
	$scope.watchListArr = [];
	
	function show() {
	    $ionicLoading.show({
	      template: 'Loading Watchlist<br/><span class="icon ion-loading-c" style="font-size:30px !important; color: #0039a9"></span>'
	    });
    }
    function hide(){
    	$ionicLoading.hide();
    }
    loadWatchList();
    show();
	
	function loadWatchList(){
		var usr = UserProfile.getWatchList();
    	
    	usr.get({gameid:$scope.game_id,id:$scope.user_id}, function(data){
			$scope.watchListArr = data.watch_list;
			
			hide();	
		}, function(error){
			$ionicPopup.alert({title: 'VSE', template: 'error '+error});
		});
	}
	
	$scope.showPortfolioHome = function(){
		window.location.href="vstoxPortfolio.html#/portfoliohome/" + window.localStorage["userID"];
	};
});

