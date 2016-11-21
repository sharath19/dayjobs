dayJobs.controller("loginController", function($scope, $http){
    
    var submit = function(user) {
        $http.post("/contacts",user,function(data){
            document.write(data)
        });
    }

})