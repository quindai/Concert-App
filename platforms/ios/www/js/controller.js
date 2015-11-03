angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', function ($scope) {
	//$scope.userEmail;
	//$scope.userSenha = "";
	$scope.destino = tryLogin();
	
	
	function tryLogin(){
		//verificar aqui os dados de login
		return 'main';
	}
}])

.controller('MainCtrl', function ($scope, $http) {
	$http.get('data.json').success(function(data){
		$scope.pics = data;
	});

	$scope.insta = function(index) {
		return window.plugins.socialsharing.shareViaInstagram('Meu evento', '{{$scope.pics[index].pic}}', function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
		//return window.plugins.socialsharing.shareViaTwitter($scope.ditados[index].pt+"\n"+$scope.ditados[index].kface+"\npartilhado pelo #milow: ", null /* angular msg */, 'https://goo.gl/xlVtC5');
	}
});