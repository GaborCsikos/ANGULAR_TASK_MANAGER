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
         .when("/addItem/:id/",{
            templateUrl: "views/addItem.html",
            controller: "TaskItemController"
        })
        .otherwise({
            redirectTo: "/"
        })
});


app.controller("HomeController", ["$scope", "TaskService", function($scope, TaskService) {
    $scope.taskItems = TaskService.taskItems;
 	$scope.appTitle = "TODO List";
    $scope.removeItem = function(entry){
        TaskService.removeItem(entry);
    }
}]);

app.controller("TaskItemController", ["$scope", "$routeParams", "$location", "TaskService", function($scope, $routeParams, $location, TaskService){

     if(!$routeParams.id) {
        $scope.taskItem = {id: 0, completed: false, itemName: ""};
    }else{
        $scope.taskItem = _.clone(TaskService.findById(parseInt($routeParams.id)));
    }


    $scope.save = function(){
        TaskService.save( $scope.taskItem );
        $location.path("/");
    };

}]);



app.service("TaskService", function(){

    var taskService = {};

    taskService.taskItems = [
        {id: 1, completed: false, itemName: 'important'},
        {id: 2, completed: false, itemName: 'medium'},
        {id: 3, completed: false, itemName: 'not important'}
    ];


        taskService.findById = function(id){
        for(var item in taskService.taskItems){
            if(taskService.taskItems[item].id === id) {
                console.log(taskService.taskItems[item]);
                return taskService.taskItems[item];
            }
        }
    };

    taskService.getNewId = function(){

        if(taskService.newId){
            taskService.newId++;
            return taskService.newId;
        }else{
            var maxId = _.max(taskService.taskItems, function(entry){ return entry.id;})
            taskService.newId = maxId.id + 1;
            return taskService.newId;
        }
    };

    taskService.removeItem = function(entry){
        var index = taskService.taskItems.indexOf(entry);

        taskService.taskItems.splice(index, 1);
    };

    taskService.save = function(entry) {

        var updatedItem = taskService.findById(entry.id);
			console.log("SAVE");
        if(updatedItem){
            updatedItem.completed = entry.completed;
            updatedItem.itemName = entry.itemName;

        }else {
            entry.id = taskService.getNewId();
            taskService.taskItems.push(entry);
        }

    };

    return taskService;

});