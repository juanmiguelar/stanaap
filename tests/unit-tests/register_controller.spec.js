describe('Prueba Usuario', function() {
    
    beforeEach(function () {
        module('registerModule');
        
    });
     var scope, ionicPopup, state, http, ctrl, httpBackend;
        
    state = jasmine.createSpyObj('$state spy', ['go']);
        
    ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    
    
    describe('Prueba Registrarse', function (){
       
         
        beforeEach(inject(function($controller, $rootScope, $httpBackend, $injector){
                scope = $rootScope.$new();
                $httpBackend = httpBackend;
                ctrl = $controller('registerController', {
                    $http:http, 
                    $scope:scope, 
                    $ionicPopup:ionicPopup, 
                    $state:state
                });
            })
        );
        
        
        it('debería validar formato incorrecto email', function(){
            scope.correo = "juan@gmail";
            scope.register();
            expect(scope.resultadoEmail).toBe(false);
        });
        
        it('debería validar que las los contraseñas sean iguales', function(){
            scope.contrasenna = "123";
            scope.verify = "123";
            scope.register();
            expect(scope.resultadoContrasenna).toBe(true);
        });
        
    
         
        it('debería registrar un usuario', function(){
            //Se definen valores a insertar, valores de prueba 
            scope.contrasenna = "123";
            scope.verify = "123";
            scope.nombre = "pedro";
            scope.correo = "prueba@gmail.com";
            scope.register();
            
            $httpBackend.when('POST', 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php' )
            .respond({ 
              status: 'success'
            });
        
            $httpBackend.flush();

            
  
            //expect(scope.respuestaRegistarusuario).toBe(1);
         });
        
    });
    
});
//STEVEN ALEX
// describe('Prueba de 1', function() {
//     var scope;
    
//     beforeEach(function () {
//     module('registerModule');
//     });
    
//     beforeEach(inject(function($rootScope, $controller){
//         scope = $rootScope.$new();
//         $controller('prueba', {$scope: scope});
//     }));
    
//         it('Se cumpla el registro', function() {
//             expect(scope.settings.casa).toEqual(true);
//         });
// });