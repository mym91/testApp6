// request the persistent file system
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {	
	/*
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
		//alert(fileSystem.name);
		//alert(fileSystem.root.name);
	}, null);
	*/
	document.getElementById("info").innerHTML = '2<img src="/map/16/34477/42572.png" alt="Bild" />' ;
	
	var map = L.map('map');
	
	//document.getElementById("info").innerHTML = cordova.file.applicationDirectory+'www/map/';
	L.tileLayer('/map/{z}/{x}/{y}.png',{
		maxZoom: 18  
	}).addTo(map);			
				
		var map = L.map('map-canvas').setView([45.423, -75.679], 13);
		//this works, but is online:
		/*
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18
		}).addTo(map);
		*/
		//TODO build something to fall back to web if not found.
		L.tileLayer('/map/{z}/{x}/{y}.png', {
			maxZoom: 17
		}).addTo(map);
		
		L.marker([45.423, -75.679]).addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
		
		var popup = L.popup();
		function onMapClick(e) {
			popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
		}
		map.on('click', onMapClick);
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
