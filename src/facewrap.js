/* 
 *
 *  FACEWRAP
 *  Angular JS module for Facebook login
 *
 */
(function () {
    var facewrap = angular.module('facewrap', []);
    facewrap.provider('$facewrap', function() {
        var ready = false;
        return {
            /* Prepare Facebook SDK by injecting script-tag.
             */
            init: function(parameters) {
                if (!parameters || !parameters.appId) throw 'Facewrap must be initialized with app Id';
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: parameters.appId,
                        cookie: parameters.cookie || true,
                        xfbml: parameters.xfbml || true,
                        version: parameters.version || 'v2.0'
                    });
                    ready = true;
                };
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            },
            /* Expose "getLoginStatus", "login" and "me"
             */
            $get: ['$rootScope', '$q', function($rootScope, $q) {
                return {
                    getLoginStatus: function () {
                        var deferred = $q.defer();
                        if (!ready) {
                            console.log('Facewrap has not been initialized');
                            deferred.reject(null);
                        } else {
                            FB.getLoginStatus(function(response) {
                                $rootScope.$apply(function() {
                                    deferred.resolve(response);
                                });
                            });
                        }
                        return deferred.promise;
                    },
                    login: function () {
                        var deferred = $q.defer();
                        if (!ready) {
                            console.log('Facewrap has not been initialized');
                            deferred.reject(null);
                        } else {
                            FB.login(function (response) {
                                $rootScope.$apply(function () {
                                    if (response.status === 'connected') {
                                        deferred.resolve(response);
                                    } else if (response.status === 'not_authorized') {
                                        deferred.reject(response);
                                    } else {
                                        deferred.reject(response);
                                    }
                                });
                            });
                        }
                        return deferred.promise;
                    },
                    me: function () {
                        var deferred = $q.defer();
                        if (!ready) {
                            console.log('Facewrap has not been initialized');
                            deferred.reject(null);
                        } else {
                            FB.api('/me', function (response) {
                                $rootScope.$apply(function () {
                                    deferred.resolve(response);
                                });
                            });
                        }
                        return deferred.promise;
                    }
                };
            }]
        };
    });
})();