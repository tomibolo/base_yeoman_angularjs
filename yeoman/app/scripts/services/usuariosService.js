'use strict';
angular.module('usuariosService', [])

  .factory('usuariosRequest', function($http, authUser) { //declaramos la factory
    var path = "http://local.larapi.com/api/usuarios";//API path
    var usuarios = {
        posts: function () {
            return $http.get(path);
        }
    };
    return usuarios;

  });
