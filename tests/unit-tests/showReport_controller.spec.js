describe('Prueba Reporte', function() {
    
    beforeEach(function () {
        module('showReportModule');
    });
     var scope,ionicPopup,state, $http, ctrl, $httpBackend;
            
    state = jasmine.createSpyObj('$state spy', ['go']);
        
    ionicPopup = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
    
    
    describe('Pruebas mostrar ', function (){
       
         
        beforeEach(inject(function($controller, $rootScope, $injector, _$http_,_$httpBackend_){
                scope = $rootScope.$new();
                ctrl = $controller('showReportController', {
                    $http:_$http_,
                    $httpBackend:_$httpBackend_,
                    $scope:scope,
                    $ionicPopup:ionicPopup,
                    $state:state
                });
            })
        );
       
      describe('Prueba metodo POST de obtener reportes según el tipo usuario', function() {
    
            var $httpBackend;
        
            beforeEach(inject(function($injector) {
              // El mock  del servicio http
              
              $httpBackend = $injector.get('$httpBackend');
              $httpBackend.when('POST', 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php')
             
            }));
             
            it('debería de enviar una solicitud POST al Backend de Reportes para obtener datos', function() {
                //Se prueba que el servicio POST responda
                scope.showReport();
                $httpBackend.expectPOST('https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php')
                .respond(200, {method:'getID', ID : "12"});
              
                $httpBackend.flush();
                expect(scope.successCallback).toEqual(true);
            });
        });
            
    });
    
});

