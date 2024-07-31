app.controller('PermissionController', ['$scope', 'PermissionService', function($scope, PermissionService) {
    $scope.permissions = [];
    $scope.permissionForm = {};
    $scope.editingPermission = null;
    $scope.errorMessage = '';

    $scope.loadPermissions = function() {
        PermissionService.getAllPermissions().then(function(response) {
            $scope.permissions = response.data;
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to load permissions: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error loading permissions:', error);
        });
    };

    $scope.createPermission = function() {
        PermissionService.createPermission($scope.permissionForm).then(function(response) {
            $scope.permissions.push(response.data);
            $scope.permissionForm = {};
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to create permission: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error creating permission:', error);
        });
    };

    $scope.editPermission = function(permission) {
        $scope.editingPermission = angular.copy(permission);
        $scope.permissionForm = $scope.editingPermission;
        $scope.errorMessage = '';
    };

    $scope.updatePermission = function() {
        PermissionService.updatePermission($scope.permissionForm.id, $scope.permissionForm).then(function(response) {
            for (var i = 0; i < $scope.permissions.length; i++) {
                if ($scope.permissions[i].id === response.data.id) {
                    $scope.permissions[i] = response.data;
                    break;
                }
            }
            $scope.editingPermission = null;
            $scope.permissionForm = {};
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to update permission: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error updating permission:', error);
        });
    };

    $scope.deletePermission = function(id) {
        PermissionService.deletePermission(id).then(function() {
            $scope.permissions = $scope.permissions.filter(function(permission) {
                return permission.id !== id;
            });
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to delete permission: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error deleting permission:', error);
        });
    };

    $scope.cancelEdit = function() {
        $scope.editingPermission = null;
        $scope.permissionForm = {};
        $scope.errorMessage = '';
    };

    $scope.loadPermissions();
}]);
