

describe('Controllers', function() {
    var scope;
    
    beforeEach(module('registerModule'));
    
    beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('prueba', {$scope: scope});
    }));
    
    it('Se cumpla el registro', function() {
        expect(scope.settings.casa).toEqual(true);
    });
});

