angular.module('reportModule', ['ngStorage'])


.controller('reportController', function($http, $scope, $ionicPopup, $state, $localStorage,
	$cordovaCamera, $cordovaFile, $cordovaFileTransfer,
	$cordovaDevice, $cordovaActionSheet, $cordovaGeolocation) {

	///SCOPES DE CASOS DE MALTRATO O ABANDONO

	if ($localStorage.CORREO_USUARIO == null) {
		var alertPopup = $ionicPopup.alert({
			title: 'Inicie seción',
			template: 'Debe iniciar seción para reportar un caso'
		});
		alertPopup.then(function(res) {
			$state.go('app.login');
		});
	}
	else {
		$scope.image = null;

		$scope.showAlert = function(title, msg) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: msg
			});
		}
		$scope.loadImage = function() {
			var options = {
				title: 'Seleccionar Fuente de la Imagen',
				buttonLabels: ['Usar Galería', 'Usar Cámara'],
				addCancelButtonWithLabel: 'Cancelar',
				androidEnableCancelButton: true,
			};
			$cordovaActionSheet.show(options).then(function(btnIndex) {
				var type = null;
				if (btnIndex === 1) {
					type = Camera.PictureSourceType.PHOTOLIBRARY;
				}
				else if (btnIndex === 2) {
					type = Camera.PictureSourceType.CAMERA;
				}
				if (type !== null) {
					$scope.selectPicture(type);
				}
			});

		}
		$scope.selectPicture = function(sourceType) {
			var options = {
				quality: 100,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: sourceType,
				saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function(imagePath) {
					// Grab the file name of the photo in the temporary directory
					var currentName = imagePath.replace(/^.*[\\\/]/, '');

					//Create a new name for the photo
					var d = new Date(),
						n = d.getTime(),
						newFileName = n + ".jpg";

					// If you are trying to load image from the gallery on Android we need special treatment!
					if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
						window.FilePath.resolveNativePath(imagePath, function(entry) {
							window.resolveLocalFileSystemURL(entry, success, fail);

							function fail(e) {
								console.error('Error: ', e);
							}

							function success(fileEntry) {
								var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
								// Only copy because of access rights
								$cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success) {
									$scope.image = newFileName;
								}, function(error) {
									$scope.showAlert('Error', error.exception);
								});
							};
						});
					}
					else {
						var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
						// Move the file to permanent storage
						$cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success) {
							$scope.image = newFileName;
						}, function(error) {
							$scope.showAlert('Error', error.exception);
						});
					}
				},
				function(err) {
					// Not always an error, maybe cancel was pressed...
				})
		}
		$scope.pathForImage = function(image) {
			if (image === null) {
				return '';
			}
			else {
				return cordova.file.dataDirectory + image;
			}
		}

		
		$scope.uploadImage = function() {
		
			// Destination URL
			var url = "https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/upload.php";

			// File for Upload
			var targetPath = $scope.pathForImage($scope.image);

			// File name only
			var filename = $scope.image;

			var options = {
				fileKey: "file",
				fileName: filename,
				chunkedMode: false,
				mimeType: "multipart/form-data",
				params: {
					'fileName': filename
				}
			};

			$cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
				console.log("Soy upload image antes del if");
				if (result.data!=0) {
					console.log("Soy upload image TRUE");
					$localStorage.imagen = filename;		
				}else{
					console.log("Soy upload image FALSE");
					$scope.showAlert('Error', 'La imagen no se subió correctamente.');
				}

			});
		}

		///SCOPES DE CASOS DE MALTRATO
		$scope.ubicacionMaltrato = function() {

			obtenerUbicacion($localStorage, $cordovaGeolocation, $ionicPopup);

			insertarDireccionMaltrato($http, $scope, $ionicPopup, $state, $localStorage);
		}

		$scope.guardarInfoReporteGeneralMaltrato = function() {
			if ($scope.titulo == null || $scope.descripcion == null || $scope.tipo == null) {
				var alertPopup = $ionicPopup.alert({
					title: 'Datos incompletos',
					template: 'Debe ingresar todos los datos del formulario'
				});
				alertPopup.then(function(res) {
					$state.go('app.createReportMaltratoAbandono');
				});
			}
			else {
				$localStorage.tipoMaltrato = $scope.tipo;
				$localStorage.tituloMaltrato = $scope.titulo;
				$localStorage.descripcionMaltrato = $scope.descripcion;
				$state.go('app.animalMaltratoAbandonoInfo');
			}
		}

		$scope.guardarInfoReporteMaltrato = function() {
			if ($scope.especie == null) {
				var alertPopup = $ionicPopup.alert({
					title: 'Datos incompletos',
					template: 'Debe ingresar la especie'
				});
				alertPopup.then(function(res) {
					$state.go('app.animalMaltratoAbandonoInfo');
				});
			}
			else {

				insertarAnimalMaltrato($http, $scope, $ionicPopup, $state, $localStorage);
				$scope.uploadImage();

				insertarReporteGeneralMaltrato($http, $scope, $ionicPopup, $state, $localStorage);

				$state.go('app.home');
			}
		}

		///SCOPES DE CASOS DE ADOPCION
		$scope.ubicacionAdopcion = function() {
			obtenerUbicacion($localStorage, $cordovaGeolocation);
			insertarDireccionAdopcion($http, $scope, $ionicPopup, $state, $localStorage);
		}

		
		$scope.guardarInfoReporteGeneralAdopcion = function() {
			

			if ($scope.titulo == null || $scope.descripcion == null) {
				var alertPopup = $ionicPopup.alert({
					title: 'Datos incompletos',
					template: 'Debe ingresar todos los datos del formulario'
				});
				alertPopup.then(function(res) {
					$state.go('app.createReportAdopcion');
				});
			}
			else {
				$localStorage.titulo = $scope.titulo;
				$localStorage.descripcion = $scope.descripcion;
				$state.go('app.animalAdopcionInfo');
			}
		}

		$scope.guardarInfoReporteAdopcion = function() {

			if ($scope.tamanno == null || $scope.especie == null) {
				var alertPopup = $ionicPopup.alert({
					title: 'Datos incompletos',
					template: 'Debe ingresar todos los datos del formulario'
				});
				alertPopup.then(function(res) {
					$state.go('app.animalAdopcionInfo');
				});
			}
			else {

				insertarAnimalAdopcion($http, $scope, $ionicPopup, $state, $localStorage);
				$scope.uploadImage();

				insertarReporteGeneralAdopcion($http, $scope, $ionicPopup, $state, $localStorage);
				$state.go('app.home');
			}
		}

	}
});

function obtenerUbicacion($localStorage, $cordovaGeolocation, $ionicPopup) {
	var posOptions = {
		timeout: 15000,
		enableHighAccuracy: true
	};

	$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function(position) {
			var lat = position.coords.latitude
			var long = position.coords.longitude

			$localStorage.latitud = lat;
			$localStorage.longitud = long;

		}, function(err) {
			var alertPopup = $ionicPopup.alert({
				title: 'Ha ocurrido un error',
				template: 'Error con la ubicación'
			});
			alertPopup.then(function(res) {
				$state.go('app.createReport');
			});
		});
}

function insertarDireccionMaltrato($http, $scope, $ionicPopup, $state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';

	$http.post(link, {
		method: 'add',
		longitud: $localStorage.longitud,
		latitud: $localStorage.latitud
	}).then(function successCallback(response) {
		$scope.response = response.data;
		$localStorage.ID_DIRECCION = $scope.response;
		$state.go('app.createReportMaltratoAbandono');
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ha ocurrido un error',
			template: 'La dirección no se pudo obtener.'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});
}

function insertarDireccionAdopcion($http, $scope, $ionicPopup, $state, $localStorage) {
	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';

	$http.post(link, {
		method: 'add',
		longitud: $localStorage.longitud,
		latitud: $localStorage.latitud
	}).then(function successCallback(response) {
		$scope.response = response.data;
		$localStorage.ID_DIRECCION = $scope.response;
		$state.go('app.createReportAdopcion');
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ha ocurrido un error',
			template: 'La dirección no se pudo obtener.'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});
}

function insertarAnimalAdopcion($http, $scope, $ionicPopup, $state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalAdopcionRouter.php';

	$http.post(link, {
		method: 'add',
		especieAdopcion: $scope.especie,
		raza: $scope.raza,
		edad: $scope.edad,
		tamanno: $scope.tamanno
	}).then(function successCallback(response) {
		$scope.response = response.data;
		$localStorage.ID_ADOPCION = $scope.response;
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ha ocurrido un error',
			template: 'Ha ocurrido un error con el reporte'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});
}

function insertarAnimalMaltrato($http, $scope, $ionicPopup, $state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalMaltratoRouter.php';

	$http.post(link, {
		method: 'add',
		especieMaltrato: $scope.especie,
		raza: $scope.raza

	}).then(function successCallback(response) {
		$scope.response = response.data;
		$localStorage.ID_MALTRATO = $scope.response;
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ha ocurrido un error',
			template: 'Ha ocurrido un error con el reporte'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});
}

function insertarReporteGeneralMaltrato($http, $scope, $ionicPopup, $state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';

	$http.post(link, {
		method: 'addGeneralMaltrato',
		titulo: $localStorage.tituloMaltrato,
		descripcion: $localStorage.descripcionMaltrato,
		id_direccion: $localStorage.ID_DIRECCION,
		id_maltrato: $localStorage.ID_MALTRATO,
		correo: $localStorage.CORREO_USUARIO,
		tipo: $localStorage.tipoMaltrato,
		imagen: $localStorage.imagen

	}).then(function successCallback(response) {
		$scope.response = response.data;
		if ($scope.response == 1) {
			var alertPopup = $ionicPopup.alert({
				title: 'Reportar caso',
				template: 'Se ha reportado el caso!'
			});
			alertPopup.then(function(res) {
				$state.go('app.home');
			});
		}
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ocurrió un error',
			template: 'No se pudo reportar el caso.'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});
}

function insertarReporteGeneralAdopcion($http, $scope, $ionicPopup, $state, $localStorage) {

	var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';

	$http.post(link, {
		method: 'addGeneralAdopcion',
		titulo: $localStorage.titulo,
		descripcion: $localStorage.descripcion,
		id_direccion: $localStorage.ID_DIRECCION,
		id_adopcion: $localStorage.ID_ADOPCION,
		correo: $localStorage.CORREO_USUARIO,
		imagen: $localStorage.imagen


	}).then(function successCallback(response) {
		$scope.response = response.data;
		if ($scope.response == 1) {
			var alertPopup = $ionicPopup.alert({
				title: 'Reportar caso',
				template: 'Se ha reportado el caso!'
			});
			alertPopup.then(function(res) {
				$state.go('app.home');
			});
		}
	}, function errorCallback(response) {
		var alertPopup = $ionicPopup.alert({
			title: 'Ocurrió un error',
			template: 'No se pudo reportar el caso.'
		});
		alertPopup.then(function(res) {
			$state.go('app.createReport');
		});
	});

}
