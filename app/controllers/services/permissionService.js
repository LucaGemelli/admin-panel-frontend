app.factory('PermissionService', ['$http', function($http) {
    var baseUrl = 'http://localhost:8080/permissions';

    return {
        getAllPermissions: function() {
            return $http.get(baseUrl);
        },
        createPermission: function(permission) {
            return $http.post(baseUrl, permission);
        },
        updatePermission: function(id, permission) {
            return $http.put(baseUrl + '/' + id, permission);
        },
        deletePermission: function(id) {
            return $http.delete(baseUrl + '/' + id);
        }
    };
}]);
