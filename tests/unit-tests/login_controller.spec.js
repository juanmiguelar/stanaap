describe('Prueba Usuario Login', function() {
    
    beforeEach(function () {
        module('loginModule');
        
    });
     var scope, ionicPopup, state, $http, ctrl, $httpBackend;
        
    state = jasmine.createSpyObj('$state spy', ['go']);
        
    ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    
    
    describe('Pruebas para registrar de usuarios', function (){
       
         
        beforeEach(inject(function($controller, $rootScope, $injector, _$http_,_$httpBackend_){
                scope = $rootScope.$new();
                ctrl = $controller('loginController', {
                    $http:_$http_,
                    $httpBackend:_$httpBackend_,
                    $scope:scope, 
                    $ionicPopup:ionicPopup, 
                    $state:state
                });
            })
        );
       
      describe('Prueba metodo POST de registrar Usuario', function() {
    
            var $httpBackend;
        
            beforeEach(inject(function($injector) {
              // El mock  del servicio http
              
              $httpBackend = $injector.get('$httpBackend');
              $httpBackend.when('POST', 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php');
            }));
             
            afterEach(function() {
             $httpBackend.verifyNoOutstandingExpectation();
             $httpBackend.verifyNoOutstandingRequest();
            });
        
        
            it('debería de enviar una solicitud POST para validar correo no repetido y login exitoso', function() {
                var cantidad;
                //Se prueba que el servicio POST responda
                scope.login();
                $httpBackend.expectPOST('https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php')
               .respond(200, {method:'validarUsuario', email : "pedro@gmail", password : "123", cantidad : "0"});
              
                $httpBackend.flush();
                expect(scope.response.cantidad).toEqual("0");
            });
            
            it('debería de enviar una solicitud POST para validar correo repetido', function() {
                var cantidad;
                //Se prueba que el servicio POST responda
                scope.login();
                $httpBackend.expectPOST('https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php')
               .respond(200, {method:'validarUsuario', email : "pedro@gmail", password : "123", cantidad : "1"});
              
                $httpBackend.flush();
                expect(scope.response.cantidad).toEqual("1");
            });
            
             
        });
            
    });
    
});

