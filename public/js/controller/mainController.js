app.controller('mainController',function($scope, $http, $location, $rootScope){
	$scope.logout = function(login){
		$http.post('logout')
		.then(function(response){
			if (response.data.message == "ok"){
				$rootScope.loginUser = false;
			}else{
				$rootScope.message = response.data.message;
			}
		})
	}
	$scope.login = function(login){

		var data = {
			email: login.email,
			password: login.password
		};
		$http.post('login',data).then(function(response){
			if(response.data.message == "ok"){
				console.log('user',response.data.data);
				$rootScope.loginUser = response.data.data._id;
				$location.url('/home');
			}else{
				$scope.login.message = response.data.message;
			}
		});
	}
	$scope.signup = function(user){
		var	data = { 
			name: user.name,
			email: user.email,
			password: user.password,
			contact: user.contact,
			gender: user.gender
		};

		$http.post('signup',data).then(function(response){
			console.log(response);
			if(response.data.message == 'ok')
				$location.url("/login");
			else
				alert(response.data);
		});
	}

	$http.get('isLogin')
	.then(function(response){
		if (response.data.message == "ok") 
		{	
			$rootScope.loginUser = response.data.data._id;
		}
	});
	
});