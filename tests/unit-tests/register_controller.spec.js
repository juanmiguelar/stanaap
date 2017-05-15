describe('Users', function() {
    
    
    it("can register with a valid email", function() {
    var message = "luis.vargas@hotmail.com";

    expect(message).toMatch('luis.vargas@hotmail.com');
    
  });
});

