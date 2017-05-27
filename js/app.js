var app = angular.module('taskManagerApp', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "views/taskList.html",
            controller: "TaskItemController"
        })
        .when("/addItem",{
            templateUrl: "views/addItem.html",
            controller: "TaskItemController"
        })
        .otherwise({
            redirectTo: "/"
        })
});


app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "TODO List";
}]);

app.controller("TaskItemController", ["$scope", function($scope){

    $scope.taskItems = [
        {completed: false, itemName: 'important', priority: 1},
        {completed: false, itemName: 'medium', priority: 2},
        {completed: false, itemName: 'not important', priority: 3},
    ]

}]);
