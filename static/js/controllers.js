/**
 * Simple Angular.js app to get started learning and working with the framework.
 */

// Define controller
function MsgListCtrl($scope, $http) {
  
  // Get data with HTTP get request and bind to scope which is seen in the HTML
  $http.get('/messages.json').success(function(data) {
    $scope.msgs = data.map(function(item) {
      item.date = new Date(item.date).toLocaleString(); 
      return item;
    });
  });

  // Function called when submit button is pressed to send data
  $scope.sendMsg = function() {
    currTime = new Date();

    // Create payload from msg and add date
    payload = {
      date: currTime.valueOf(), // milliseconds since epoch
      msg:  $scope.currMsg
    }

    // Send post request to server to insert into mongodb
    $http.post('messages', payload).success(function() {
      payload.date = currTime.toLocaleString();
      $scope.msgs.unshift(payload); // Add to current array of msgs for pseudo live update
    });
  }
}

// Initiate angular app and bind controller to app
var msgboardApp = angular.module('msgboardApp', []);
msgboardApp.controller('MsgListCtrl', MsgListCtrl);
