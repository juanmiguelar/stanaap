angular.module('starter.services',[])

/* Factory */

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.factory("Firebase", function() {
  var config = {
    apiKey: "AIzaSyDk0W3fJGK95eaFnt7JUer9uuS2RCnv0XY",
    authDomain: "animalreport-f428b.firebaseapp.com",
    databaseURL: "https://animalreport-f428b.firebaseio.com",
    projectId: "animalreport-f428b",
    storageBucket: "animalreport-f428b.appspot.com",
    messagingSenderId: "936333517488"
  };
  return firebase.initializeApp(config);
});
