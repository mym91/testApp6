// request the persistent file system
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {	
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		alert(fileSystem.name);
		alert(fileSystem.root.name);
		document.getElementById("info").innerHTML = fileSystem.name+'www/map/';
	}, null);
	
	var map = L.map('map').setView([47.331287, 9.408071], 16);
	
	//document.getElementById("info").innerHTML = cordova.file.applicationDirectory+'www/map/';
	L.tileLayer('map/{z}/{x}/{y}.png',{
		maxZoom: 20  
	}).addTo(map);				
})
	

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
