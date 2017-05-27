var app = angular.module('taskManagerApp', []);

app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "TODO List";
}]);

app.controller("TaskItemController", ["$scope", function($scope){

    $scope.taskItems = [
        {completed: false, itemName: 'important', priority: 'HIGH'},
        {completed: false, itemName: 'medium', priority: 'MEDIUM'},
        {completed: false, itemName: 'not important', priority: 'LOW'},
    ]

}]);
