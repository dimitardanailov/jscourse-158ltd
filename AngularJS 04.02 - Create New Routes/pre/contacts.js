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

      // Add contact
      .when('/add', { 
        templateUrl: 'edit.html',
        controller: 'Add'
      })

      // Delete Contact
      .when('/delete/:index', { 
        templateUrl: 'edit.html',
        controller: 'Delete'
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
    $scope.index = $routeParams.index;
    $scope.title = "Edit contact"
  }) // End Controller Edit

  .controller('Add', function ($scope, $routeParams) {
    // Create a new default contact. This contact can be change
    var person = { name: "New Contact", number: "" };
    var length = $scope.contacts.push(person);
    $scope.contact = person;
    $scope.title = "Add contact"
    $scope.index = length - 1;
  }) // End Controller Add

  .controller('Delete', function($scope, $routeParams, $location) {
    // Delete a contact from array and redirect to index page
    var index = $routeParams.index;
    $scope.contacts.splice(index, 1);
    $location.path('/').replace();
  }); // End Delete Controller
