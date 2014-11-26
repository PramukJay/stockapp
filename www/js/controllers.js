var userId = window.localStorage["userId"];
var userName = window.localStorage["userName"];

//var db ;

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSQLite, stockFactory) {
	$scope.users = [];
	$scope.loginData = {};
	//loadUser();
	
	//DB Test/////
	
		var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
		$cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(response){
			console.log("INSERT ID ------>" + response.insertID);
		});
	
	//////////////
	
	$scope.doLogin = function (){
		stockFactory.getRssFeed().success(function(data){
			companies = x2js.xml_str2json(data);
            $scope.users = companies.stock.user;
            for(var x = 0;x<$scope.users.length;x++){
            	if($scope.loginData.username === $scope.users[x].uname && $scope.loginData.pwd === $scope.users[x].password){
            		window.localStorage["userId"] = $scope.users[x].uid;
            		window.localStorage["userName"] = $scope.users[x].uname;
            		window.location.href="#/tab/menu";
            		break;
            	}else{
            		$scope.testData = "User not found";
            	}
            }
		}).error(function(data, status, headers, config) {
			$scope.testData = "Auth.signin.error!";
			console.log("Auth.signin.error!");
	    });
	};
})

.controller('MenusCtrl', function($scope, Menus) {
	$scope.menus = Menus.all();
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
		window.location.href = "#/tab/dash";
	};
})

.controller('MarketSummaryCtrl', function($scope, stockFactory) {
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
.controller('AnnouncementsCtrl', function($scope) {
	
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
	
});
