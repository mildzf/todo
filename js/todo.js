(function(){
    'use strict'; 

    angular.module('ToDoApp', [])
    .controller('TodoController', TodoController)
    .controller('AddTaskController', AddTaskController)
    .controller('ActiveController', ActiveController)
    .controller('InactiveController', InactiveController)
    .service('ListService', ListService);

    TodoController.$inject = ['$scope', 'ListService'];
    function TodoController($scope, ListService) {
        $scope.activeItems = ListService.getActive()
        $scope.inactiveItems = ListService.getInactive()
        $scope.removeItem = function(list, index) {
            ListService.removeItem(list, index)
        }
        $scope.toggleImportance = function(list, index) {
            ListService.toggleImportance(list, index)
        }
        $scope.markComplete = function(index) {
            ListService.markComplete(index)
        }
    }
    
    AddTaskController.$inject = ['$scope', 'ListService'];
    function AddTaskController($scope, ListService) {
        $scope.task = ""
        $scope.addItem = function() {
            ListService.addItem($scope.task)
            $scope.task = "";
        }
    }

    ActiveController.$inject = ['$scope', 'ListService'];
    function ActiveController($scope, ListService) {
        $scope.activeItems = ListService.getActive()

    }
    
    InactiveController.$inject = ['$scope', 'ListService']
    function InactiveController($scope, ListService) {
        $scope.inactiveItems = ListService.getInactive()
        $scope.markIncomplete = function(index) {
            ListService.markIncomplete(index)
        }

    }
        

    function ListService () {
        var service = this;
        var active = [];
        var inactive = [];

        service.addItem = function (content) {
            var task = new Object;
            task.content = content,
            task.done = false;
            task.important = false 
            active.push(task)
        }

        service.getActive = function(){
            return active;
        }
        service.getInactive = function() {
            return inactive
        }
        service.removeItem = function(index) {
            active.splice(index, 1);

        }
        service.markComplete = function(index) {
            inactive.push(active[index]);
            active.splice(index, 1);

        }
        service.markIncomplete = function(index) {
            active.push(inactive[index]);
            inactive.splice(index, 1);

        }
        service.markImportant = function(list, index) {
            list[index].important = true;

        }
        service.toggleImportance = function(list, index) {
            if(list[index].important == false) {
                list[index].important = true;
            }
            else {
                list[index].important = false;
            }
        }
    

    }
})();