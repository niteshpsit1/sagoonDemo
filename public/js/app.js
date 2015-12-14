var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl: 'pages/home.html',
		controller: 'userController'
	})
	.when('/login',{
		templateUrl: 'pages/login.html'
	})
	.when('/signup',{
		templateUrl: 'pages/signup.html'
	})
	.otherwise({
        redirectTo: '/'
    });
});