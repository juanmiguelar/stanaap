describe('Prueba Usuario', function() {
    
    beforeEach(function () {
        module('registerModule');
        
    });
     var scope, ionicPopup, state, http, ctrl,$httpBackend;
        
    state = jasmine.createSpyObj('$state spy', ['go']);
        
    ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    
    
    
    describe('Prueba Registrarse', function (){
       
         
        beforeEach(inject(function($controller, $rootScope){
                scope = $rootScope.$new();
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
            scope.verify = "12";
            scope.register();
            expect(scope.resultadoContrasenna).toBe(false);
        });
         
        it('debería registrar un usuario', function(){
            //Se definen valores a insertar, valores de prueba 
            scope.contrasenna = "123";
            scope.verify = "123";
            scope.correo = "prueba@gmail.com";
            
            // $httpBackend.when('POST', 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php', function(data) {
            //   return angular.fromJson(data).username === 'hardcoded_user'
            // })
            // .respond({ 
            //   username: 'hardcoded_user'
            // });
        
            // $httpBackend.flush();

             
            
            //Llama el metodo
            // scope.register();
            
            //Si es 1 es porque se insertó a la BD
            // expect(scope.respuestaRegistarusuario).toBe(1);
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