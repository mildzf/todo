(function(){
    angular.module('ToDoApp', [])
    .controller('ToDoAppController', ToDoAppController);

    ToDoAppController.$inject = ['$scope']
    function ToDoAppController($scope) {
        $scope.tasks = [];
        $scope.completed = [];
        $scope.newTaskName = "";
        

        $scope.addTask = function(){
            var task = new Object();
            task.name = "";
            task.done = false;
            task.name = $scope.newTaskName;
            task.done = false;
            $scope.tasks.push(task)
            $scope.newTaskName = ""
        }

        $scope.markComplete = function(index) {
            var task = new Object();
            task.name = $scope.tasks[index].name
            task.done = true 
            $scope.completed.push(task)
            $scope.tasks.splice(index, 1)
            
            

        }

        $scope.markIncomplete = function(index) {
            var completedTask = $scope.completed[index]
            $scope.newTaskName = completedTask.name
            $scope.addTask();
            $scope.completed.splice(index, 1)
        }
    }
})();