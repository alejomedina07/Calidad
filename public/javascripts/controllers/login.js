(function(){
  'use strict';

  app.controller('login', ['$scope', '$rootScope', '$http', 'md5', 'ToastFactoria', function($scope, $rootScope, $http, md5, ToastFactoria){
    var $lCtrl = this;



    $lCtrl.login = function() {
      $lCtrl.loading = true;
      $http.post('/login', $lCtrl.form)
      .then(result => {
        localStorage.setItem("operaciones", result.data.usuario.operaciones);
        // $lCtrl.loading = false;
        window.location.href = "/dashboard";
      })
      .catch(error => {
        $lCtrl.loading = false;
        ToastFactoria.rojo({contenido:error.data.mensaje})
      });
    };


    // Inicio de estilos para interfaz
    var current = null;
    document.querySelector('#user').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: { value: 0, duration: 700, easing: 'easeOutQuart' },
        strokeDasharray: { value: '240 1386', duration: 700, easing: 'easeOutQuart' }
      });
    });
    document.querySelector('#password').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: { value: -336, duration: 700, easing: 'easeOutQuart' },
        strokeDasharray: { value: '240 1386', duration: 700, easing: 'easeOutQuart' }
      });
    });
    document.querySelector('#submit').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: { value: -730, duration: 700, easing: 'easeOutQuart' },
        strokeDasharray: { value: '530 1386', duration: 700, easing: 'easeOutQuart' }
      });
    });
    // Fin de estilos para interfaz

  }]);
})();
