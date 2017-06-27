angular.module('searchModule', ['ngStorage'])


.controller('searchController', function($http, $scope, $state, $localStorage) {
	$scope.casos = [];
	
    $scope.buscarPerros = function(){
        $localStorage.especie = "Perro";
		$state.go('app.searchReport');
    }
     $scope.buscarGatos = function(){
        $localStorage.especie =  "Gato";
		
    }
     $scope.buscarAves = function(){
        $localStorage.especie =  "Ave";
        $state.go('app.searchReport');
     
    }
    $scope.buscarOtros = function(){
        $localStorage.especie =  "Otro";
        $state.go('app.searchReport');
    }
    
    $scope.mostrarLista = function(){
        buscarPorEspecie($http, $scope, $state, $localStorage);
    }
    $scope.showReport = function(ID,TIPO){
        $localStorage.ID = ID;
        $localStorage.TIPO = TIPO;
        $state.go('app.showReportMaltratoAbandono');
    }
});
   
function buscarPorEspecie($http, $scope,$state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';

	$http.post(link, {
		method: 'buscarEspecie',
		email: $localStorage.CORREO_USUARIO,
		especie: $localStorage.especie  
	}).then(function successCallback(response) {
		$scope.casos= response.data;
		console.log($scope.casos);
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: '0 resultados',
			template: 'No hay casos que correspondan a esa especie'
		});
		alertPopup.then(function(res) {
			$state.go('app.filtroEspecie');
		});
	});
}

 

