var dayJobs = angular.module("dayJobs",[]);
dayJobs.controller("LoginController", function($scope, $http){
    
    $scope.submit = function() {
        $http.post("/contacts",$scope.user).then(function(data){
            $scope.insertData = data;
        })
    }

})