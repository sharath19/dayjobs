dayJobs.controller("loginController", function($scope, $http){
    
    var submit = function(user) {
        $http.post("/login",user,function(data){
            document.write(data)
        });
    }

})