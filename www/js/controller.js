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

.controller('MainCtrl', function ($scope, $http, $mdDialog) {
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
					console.log(message);
					console.log(JSON.stringify(dados));
					alert('Extracted: '+message.jobID);
				})
				.error(function(message){
					console.log(message);
					//alert(message);
				})
				alert("Preparing to extract text from picture");
	}

	var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    $scope.announceClick = function(index) {
    	var title = 'About', content = 'Concert App for Hackathon Challenge Episode 2';
    	if(index == 1){
    		title = 'Settings'; 
    		content = 'Here you define your Settings';
    	};
    	if(index==2){
    		title = 'Logout';
    		content = 'Loging Out';
    	};
      $mdDialog.show(
        $mdDialog.alert()
          .title(title)
          .content(content)
          .ok('Done')
          .targetEvent(originatorEv)
      );
      originatorEv = null;
    };
});