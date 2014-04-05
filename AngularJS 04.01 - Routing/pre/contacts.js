angular
  .module('contacts', ['ngRoute'])
  .config(function ($routeProvider) {
    // Configure the routes

    $routeProvider
      // Edit contact
      .when('/contact/:index', { 
        templateUrl: 'edit.html',
        controller: 'Edit'
      })

      // List all contacts
      .when('/', {
        templateUrl: 'list.html'
      });
  })
  // End .config

  .controller('Contacts', function ($scope) {
    // Contacts is the parent controller, so
    // $scope.contacts is available in all children
    $scope.contacts = [
      { name: 'Dimitar', number: '1234' },
      { name: 'Alexander', number: '4567' },
      { name: 'Maria', number: '7890' },
      { name: 'Hristo', number: '5789' }
    ];
  })
  // End controller Contacts

  .controller('Edit', function ($scope, $routeParams) {
    // Load in a contact from the route (/contact/:index)
    $scope.contact = $scope.contacts[$routeParams.index];

    console.log($scope.contact);
    $scope.index = $routeParams.index;
  });
