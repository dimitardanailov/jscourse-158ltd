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

      // Add new contact
      .when('/add', { 
        templateUrl: 'edit.html',
        controller: 'Add'
      })

      // Delete contact
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
    $scope.title = "Edit Contact";
  }) // End Edit Controller

  .controller('Add', function ($scope, $routeParams) {
    // Add a new default contact into global scope
    var person = { name: "Default Contact", number: "" };
    // Add new default contact
    var position = $scope.contacts.push(person);

    $scope.contact = person; 
    $scope.index = position - 1;
    $scope.title = "Add Contact";
  }) // End Add Controller

  .controller('Delete', function ($scope, $routeParams, $location) {
    // Delete contact from global scope
    var index = $routeParams.index;
    $scope.contacts.splice(index, 1);

    // Redirect to Parent Controller
    $location.path('/').replace();
  }); // End Delete Controller
