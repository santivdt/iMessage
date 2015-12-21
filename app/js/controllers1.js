'use strict';

/* Controllers */

// Define app and its dependencies

var dataDash = angular.module('dataDash', ['firebase', 'ui.router']);



dataDash.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: '../views/about.html',
            controller: 'aboutCtrl'
        });
});

dataDash.controller('imsgCtrl', ['$scope', '$http', '$firebaseObject', function($scope, $http, $firebaseObject) {


    //var ref = new Firebase("https://sizzling-fire-3946.firebaseIO.com");
    //
    //$scope.berichten = $firebaseObject(ref);

    $http.get('/api/messages')
        .success(function(data) {
            $scope.messages = data;
            //angular.forEach(data, function(value, key)
            //{
            //    var date = new Date(value.date);
            //    value.date = date.toISOString();
            //    $scope.messages = data;
            //});
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    //
    $http.get('data/daphne_small.json').success(function(data) {

        $scope.messages = data;
        angular.forEach(data, function(value, key)
                {
            var date = new Date(value.date);
            value.date = date.toISOString();
            $scope.messages = data;
                });

        });

    $http.get('data/people.json').success(function(data) {
        $scope.people = data;
    });



    $scope.terms =[];
    $scope.dates = [];

    $scope.addTerm = function () {

                $scope.terms.push({text:$scope.query, count:$scope.filtered.length});

                    };

    $scope.addDate = function () {


        $scope.dates.push({date:$scope.date, count:$scope.filtered.length});
    };

}]);






dataDash.controller('aboutCtrl', function($scope){

    $scope.tagline = 'About iMessage'
});