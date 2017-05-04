

angular.module('userModel',[])

.factory('User', function(){
    function User(nombre, apellido, email){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    } 
    User.build = function(data){
        if(!data)
            return null;
        return new User(data.nombre, data.apellido, data.email);
        
    }
    return User;
    
})