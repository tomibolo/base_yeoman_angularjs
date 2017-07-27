'use strict';

angular.module('yeomanApp')
  .controller('menuCtrl', function($location, authUser, $scope) {
    var vm = this;

    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }

    vm.isLogin = authUser.isLoggedIn();

    $scope.$watch( function() {
      return authUser.isLoggedIn();
    }, function(newVal) {
      if(newVal !== 'undefined') {
        vm.isLogin = authUser.isLoggedIn;
      }
    } );

    vm.logout = function() {
      authUser.logout();
    }

    // console.log(authUser.exp());
  })
