app.controller('userController',function($scope, $http, $rootScope){
	$scope.taskInfo = "";
	$http.get('task')
	.then(function(response){
		if(response.data.message === "ok")
			$scope.tasks = response.data.data;

		else {
			$scope.message = "Nothing to display sorry";
		}
	});

	$scope.addTask = function(task){

		var data = {
			created_by: $rootScope.loginUser,
			todo: task.todo
		};
		$http.post('task',data).then(function(response){
			if(response.data.message == "ok"){
				$scope.taskInfo = "task added to the list";
			}else{
				$scope.login.message = response.data.message;
			}
		});
	}
	setInterval(function(){

		if($scope.taskInfo != ""){
			$scope.$apply(function() {
				$scope.taskInfo = "";
			});
		}
		$http.get('task')
		.then(function(response){
			if(response.data.message === "ok"){
				$scope.tasks = response.data.data;
			}
		});
	}, 8000);
});