function MsgListCtrl($scope, $http) {
  $http.get('/messages.json').success(function(data) {
    $scope.msgs = data.map(function(item) {
      item.date = new Date(item.date).toLocaleString(); 
      return item;
    });
  });

  $scope.sendMsg = function() {
    currTime = new Date();

    payload = {
      date: currTime.valueOf(),
      msg:  $scope.currMsg
    }

    $http.post('messages', payload).success(function() {
      payload.date = currTime.toLocaleString();
      $scope.msgs.unshift(payload);
    });
  }
}

var msgboardApp = angular.module('msgboardApp', []);
msgboardApp.controller('MsgListCtrl', MsgListCtrl);
