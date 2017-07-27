'use strict';

angular.module('yeomanApp')
  .controller('usuariosCtrl', function(usuariosRequest, toastr, $scope, authUser) {

    var vm = this;
    vm.menuTemplate = {
      url : 'views/menu.html'
    }


    usuariosRequest.posts()
    .then(
      function(response) {
        $scope.data = response.data.message;
      },
      function(error) {
        if(error.data.error === 'token_not_provided') {
          toastr.error('Para poder visualizar los usuarios debe inciar sesión', 'Mensaje');
        }
      }
    );

  });
