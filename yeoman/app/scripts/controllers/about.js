'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('AboutCtrl', function () {
    var vm = this;
    vm.menuTemplate = {
      url : 'views/menu.html'
    }
  });
