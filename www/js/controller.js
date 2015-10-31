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
		//return window.plugins.socialsharing.share('Message and image', null, 'https://www.google.nl/images/srpr/logo4w.png', null);
		//return window.plugins.socialsharing.share('Message and image', null, 'https://goo.gl/IT4wNZ', null);
		return window.plugins.socialsharing.shareViaInstagram('Meu evento', $scope.pics[index].pic, function() {console.log('share ok')}, function(errormsg){alert('Erro ao tentar publicar no instagram.')});
		//return window.plugins.socialsharing.shareViaTwitter($scope.ditados[index].pt+"\n"+$scope.ditados[index].kface+"\npartilhado pelo #milow: ", null /* angular msg */, 'https://goo.gl/xlVtC5');
	}

	var hp_apikey = 'a463c36d-3f23-4da7-9cd5-83d28ceb34ba';
	var dados;
	$scope.readImage = function(index){
		$http.post("https://api.idolondemand.com/1/api/async/ocrdocument/v1",
				{
					'apikey': hp_apikey,
					'file': $scope.pics[index].pic
				})
				.success(function(message, token){
					dados = message;
					JSON.stringify(dados);
					console.log(message);
					alert('Extracted: '+message);
				})
				.error(function(message){
					console.log(message);
					//alert(message);
				})
				alert("Preparing to extract text from picture");
	}

	var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.announceClick = function(index) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('You clicked!')
          .content('You clicked the menu item at index ' + index)
          .ok('Nice')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };
});