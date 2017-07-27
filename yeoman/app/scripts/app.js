'use strict';

/**
 * @ngdoc overview
 * @name yeomanApp
 * @description
 * # yeomanApp
 *
 * Main module of the application.
 */
angular
  .module('yeomanApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'authService',
    'toastr',
    'usuariosService',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider, $locationProvider, $authProvider, $httpProvider, cfpLoadingBarProvider) {

    //Llamo al interceptor para validacion de tokens
    $httpProvider.interceptors.push('interceptor');

    //Deshabilito icono de Spinner en loading.
    cfpLoadingBarProvider.includeSpinner = false;


    $authProvider.loginUrl = 'http://local.larapi.com/api/auth/login';
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/usuarios', {
        templateUrl: 'views/usuarios.html',
        controller: 'usuariosCtrl',
        controllerAs: 'usuarios'
      })
      .otherwise({
        redirectTo: '/'
      });
      // $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix(''); //Arreglo el codigo de la URL por la version de Angular


  })
  // use the HTML5 History API

  .run( function($rootScope, $location, authUser, toastr) {

    var rutasPrivadas = ['/about', '/usuarios'];

    $rootScope.$on('$routeChangeStart', function() {

      if( ( $.inArray($location.path(), rutasPrivadas) !== -1  && !authUser.isLoggedIn()) ) {

        toastr.error('Debe iniciar sesión para poder continuar.', 'Mensaje');

        $location.path('/login');

      }
    });
  } );
