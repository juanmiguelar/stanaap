describe('Prueba Usuario', function() {
    
    beforeEach(function () {
        module('registerModule');
        
    });
     var scope, ionicPopup, state, $http, ctrl, $httpBackend;
        
    state = jasmine.createSpyObj('$state spy', ['go']);
        
    ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    
    
    describe('Pruebas para registrar de usuarios', function (){
       
         
        beforeEach(inject(function($controller, $rootScope, $injector, _$http_,_$httpBackend_){
                scope = $rootScope.$new();
                ctrl = $controller('registerController', {
                    $http:_$http_,
                    $httpBackend:_$httpBackend_,
                    $scope:scope, 
                    $ionicPopup:ionicPopup, 
                    $state:state
                });
            })
        );
        
        it('debería validar formato incorrecto email', function(){
            scope.correo = "juan@gmail";
            scope.validarEmail();
            expect(scope.resultadoEmail).toBe(false);
        });
        
        it('debería validar que las los contraseñas sean iguales', function(){
            scope.contrasenna = "123";
            scope.verify = "123";
            scope.validarContraseña();
            expect(scope.resultadoContrasenna).toBe(true);
        });
       
      describe('Mocked HTTP Requests', function() {
    
        var $httpBackend;
    
        beforeEach(inject(function($injector) {
          // Set up the mock http service responses
          
          $httpBackend = $injector.get('$httpBackend');
          $httpBackend.when('POST', 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php')
            .respond(200, {method: 'add',  correo: "messi@gmail.com", contrasenna: "11234",nombre : "Leo"});
         }));
         
        afterEach(function() {
         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();
        });
    
    
        it('should have sent a POST request to the checkuser API', function() {
            scope.insertarUser();
            $httpBackend.expectPOST('https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php');
            expect(scope.valid).toEqual(true);
            $httpBackend.flush();
        });
         
        });
            
    });
    
});

