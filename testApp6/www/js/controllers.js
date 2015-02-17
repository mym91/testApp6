// request the persistent file system
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {	
	/*
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		//alert(fileSystem.name);
		//alert(fileSystem.root.name);
	}, null);
	*/
	document.getElementById("info").innerHTML = '1<img src="/map/16/34477/42572.png" alt="Bild" />' ;
	
	var map = L.map('map');
	
	//document.getElementById("info").innerHTML = cordova.file.applicationDirectory+'www/map/';
	L.tileLayer('/map/{z}/{x}/{y}.png',{
		maxZoom: 18  
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
