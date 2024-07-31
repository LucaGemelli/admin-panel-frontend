app.factory('UserService', ['$http', function($http) {
    var baseUrl = 'http://localhost:8080/users';

    return {
        getAllUsers: function() {
            return $http.get(baseUrl);
        },
        createUser: function(user) {
            return $http.post(baseUrl, user);
        },
        updateUser: function(id, user) {
            return $http.put(baseUrl + '/' + id, user);
        },
        deleteUser: function(id) {
            return $http.delete(baseUrl + '/' + id);
        }
    };
}]);
