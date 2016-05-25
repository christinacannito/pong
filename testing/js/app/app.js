var pong = angular.module('pong', ['ngRoute']);
// ngRoute is a dependency
// pong is just a javascript variable but it stores the name of our app from the html file

pong.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/login', {
			templateUrl: '/testing/js/app/views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: '/testing/js/app/views/register.html',
			controller: 'RegistrationController'
		}).
		when('/success', {
			templateUrl: '/testing/js/app/views/success.html',
			controller: 'SuccessController'
		}).
		otherwise({
			redirectTo: '/login'
		});

}])