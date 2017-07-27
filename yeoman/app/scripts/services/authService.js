'use strict';

angular.module('authService', [])

  .factory('sessionControl', function() {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, val) {
        return sessionStorage.setItem(key, val);
      },
      unset: function(key) {
        return sessionStorage.removeItem(key);
      }
    }
  })

  .factory('authUser', function($auth, sessionControl, toastr, $location, $window) {


      var getExp = function getUserFromToken() {
          var token = localStorage.getItem('satellizer_token');
          var dataToken = {};
          if (typeof token !== 'undefined') {
              var encoded = token.split('.')[1];
              encoded = encoded.replace('-', '+').replace('_', '/');
              dataToken = JSON.parse(window.atob(encoded));
          }

          return dataToken.exp;
      }

      var cacheSession = function() {
        sessionControl.set('userIsLogin', true);
        // sessionControl.set('email', email);
        // sessionControl.set('username', username);
      };

      var unCacheSession = function() {
        sessionControl.unset('userIsLogin');
        // sessionControl.unset('email');
        // sessionControl.unset('username');
      };

      var login = function(loginForm) {
        $auth.login(loginForm).then(
          function (response) {
            cacheSession();
            $location.path('/');
            toastr.success('Sesión iniciada con éxito', 'Mensaje');
          },
          function (error) {
            unCacheSession();
            toastr.error('Verifique sus credenciales', 'Error');
          }

        );
      };

      return {

        loginApi : function(loginForm) {
          login(loginForm);
        },

        logout : function() {
          $auth.logout();
          unCacheSession();
          toastr.success('Session Finalizada', 'Mensaje');
          $location.path('/login');
        },

        isLoggedIn: function() {
          return sessionControl.get('userIsLogin') !== null;
        },
        exp: function() {
          return getExp();
        }

      }
  })

  .factory('interceptor', function($q, $window, $location) {
    return {
            'response': function (response) {

              //Consigo el refresh token y lo seteo de nuevo.
              if (response.data.token != null) {
                $window.localStorage.setItem('satellizer_token', response.data.token  );
              }
                return response;
            }
            ,'responseError': function(response) {

              //En caso que la sesion haya expirado, deslogueo el usuario.
              if( response.data.error === 'token_not_provided' ) {
                localStorage.removeItem('satellizer_token');
                sessionStorage.removeItem('userIsLogin');
                $location.path('/login');
              }
              return $q.reject(response);
            }

        };
  })
