'use strict';

/* Controllers */

var dataDash = angular.module('dataDash', []);



dataDash.controller('imsgCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('data/daphne.json').success(function(data) {

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

    //$scope.orderProp = 'date';

    $scope.terms =[];

    $scope.addTerm = function () {

            $scope.terms.push({text:$scope.query, count:$scope.filtered.length});

        };

    this.tab = 1;

    this.setTab = function(newValue){
        this.tab = newValue;
    };

    this.isSet = function(tabName){
        return this.tab === tabName;
    };


}]);






dataDash.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
        this.tab = newValue;
    };

    this.isSet = function(tabName){
        return this.tab === tabName;
    };
});