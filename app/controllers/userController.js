app.controller('UserController', ['$scope', 'UserService', 'PermissionService', function($scope, UserService, PermissionService) {
    $scope.users = [];
    $scope.permissions = [];
    $scope.userForm = {};
    $scope.editingUser = false;
    $scope.errorMessage = '';

    $scope.loadUsers = function() {
        UserService.getAllUsers().then(function(response) {
            $scope.users = response.data;
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to load users: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error loading users:', error);
        });
    };

    $scope.loadPermissions = function() {
        PermissionService.getAllPermissions().then(function(response) {
            $scope.permissions = response.data;
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to load permissions: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error loading permissions:', error);
        });
    };

    $scope.initForm = function() {
        $scope.userForm = {
            name: '',
            login: '',
            selectedPermissions: {}
        };

        $scope.permissions.forEach(function(permission) {
            $scope.userForm.selectedPermissions[permission.id] = false;
        });
    };

    $scope.createUser = function() {
        $scope.userForm.permissions = Object.keys($scope.userForm.selectedPermissions).filter(function(key) {
            return $scope.userForm.selectedPermissions[key];
        }).map(function(permissionId) {
            var permission = $scope.permissions.find(function(p) {
                return p.id == permissionId;
            });
            return permission ? permission.name : null;
        }).filter(function(permissionName) {
            return permissionName;
        });

        UserService.createUser($scope.userForm).then(function(response) {
            $scope.users.push(response.data);
            $scope.initForm();
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to create user: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error creating user:', error);
        });
    };

    $scope.editUser = function(user) {
        $scope.editingUser = true;
        $scope.userForm = {
            id: user.id,
            name: user.name,
            login: user.login,
            selectedPermissions: {}
        };

        $scope.permissions.forEach(function(permission) {
            $scope.userForm.selectedPermissions[permission.id] = user.permissions.includes(permission.name);
        });
        $scope.errorMessage = '';
    };

    $scope.updateUser = function() {
        $scope.userForm.permissions = Object.keys($scope.userForm.selectedPermissions).filter(function(key) {
            return $scope.userForm.selectedPermissions[key];
        }).map(function(permissionId) {
            var permission = $scope.permissions.find(function(p) {
                return p.id == permissionId;
            });
            return permission ? permission.name : null;
        }).filter(function(permissionName) {
            return permissionName;
        });

        UserService.updateUser($scope.userForm.id, $scope.userForm).then(function(response) {
            var updatedUser = response.data;
            var index = $scope.users.findIndex(function(user) {
                return user.id === updatedUser.id;
            });

            if (index !== -1) {
                $scope.users[index] = updatedUser;
            }
            $scope.editingUser = false;
            $scope.initForm();
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to update user: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error updating user:', error);
        });
    };

    $scope.deleteUser = function(id) {
        UserService.deleteUser(id).then(function() {
            $scope.users = $scope.users.filter(function(user) {
                return user.id !== id;
            });
            $scope.errorMessage = '';
        }, function(error) {
            $scope.errorMessage = 'Failed to delete user: ' + (error.data ? error.data.message : 'Unknown error');
            console.error('Error deleting user:', error);
        });
    };

    $scope.cancelEdit = function() {
        $scope.editingUser = false;
        $scope.initForm();
        $scope.errorMessage = '';
    };

    $scope.initForm();
    $scope.loadUsers();
    $scope.loadPermissions();
}]);
