'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanApp
 */
angular.module('yeomanApp')
  .controller('MainCtrl', function () {
    var vm = this;
    vm.menuTemplate = {
      url : 'views/menu.html'
    }
  });
