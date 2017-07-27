'use strict';

angular.module('yeomanApp')
  .controller('LoginCtrl', function(authUser) {
    var vm = this;
    vm.loginForm = {
      email : 'caca@caca.com',
      password : 'caca'
    }

    vm.login = function() {
      authUser.loginApi(vm.loginForm);
    }
  })
