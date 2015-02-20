// request the persistent file system
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, Places) {	
	
	var map = L.map("map-canvas").setView([47.331611, 9.407531], 17);
	/*
	$scope.places = Places.all();
	*/
	var places = Places.all();
	
	var customIcon = L.Icon.extend({
		options: {
			iconUrl: 'img/leaflet/icon-default.png',
			iconRetinaUrl: 'img/leaflet/icon-default-2x.png',
			iconSize: [25, 41],
			iconAnchor: [22, 41],
			popupAnchor: [-10, -42],
			shadowUrl: 'img/leaflet/marker-shadow.png',
			shadowRetinaUrl: 'img/leaflet/marker-shadow.png',
			shadowSize: [41, 41],
			shadowAnchor: [22, 41]
		}
	});
	
	var iconCat1 = new customIcon({iconUrl: 'img/leaflet/icon-restaurant.png', iconRetinaUrl: 'img/leaflet/icon-restaurant-2x.png'}),
		iconCat2 = new customIcon({iconUrl: 'img/leaflet/icon-culture.png', iconRetinaUrl: 'img/leaflet/icon-culture-2x.png'}),
		iconCat3 = new customIcon({iconUrl: 'img/leaflet/icon-religion.png', iconRetinaUrl: 'img/leaflet/icon-religion-2x.png'}),
		iconCat4 = new customIcon({iconUrl: 'img/leaflet/icon-family.png', iconRetinaUrl: 'img/leaflet/icon-family-2x.png'}),
		iconDefault = new customIcon({iconUrl: 'img/leaflet/icon-default.png', iconRetinaUrl: 'img/leaflet/icon-default-2x.png'});
		
	var marker = [];
	for (var i = 0; i < places.length; i++) {
		var cat = places[i].cat;
		if(!marker[cat]) {
			marker[cat] = [];
		}
		icon = iconDefault;
		switch (cat) {
			case 1: 
				icon = iconCat1;
			break;
			case 2: 
				icon = iconCat2;
			break;
			case 3: 
				icon = iconCat3;
			break;
			case 4: 
				icon = iconCat4;
			break;				
		}
		
		marker[cat].push(L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/places/'+places[i].id+'">mehr</a>'));
	}
		
	L.control.layers({
		"Restaurants":L.layerGroup(marker[1]),
		"Kultur": L.layerGroup(marker[2]),
		"Kirchen": L.layerGroup(marker[3]),
		"Familie": L.layerGroup(marker[4])
	}).addTo(map);
		
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(map);
	
	
		
	/*
	var popup = L.popup();
	function onMapClick(e) {
		popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(map);
	}
	map.on('click', onMapClick);
	*/
	
	map.locate({setView: true, maxZoom: 17});
	

	function onLocationFound(e) {
		var radius = e.accuracy / 2;
	
		L.marker(e.latlng).addTo(map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();
	
		L.circle(e.latlng, radius).addTo(map);
	}
	
	map.on('locationfound', onLocationFound);
	function onLocationError(e) {
		alert(e.message);
	}
	
	map.on('locationerror', onLocationError);
})
	

.controller('MapDetailCtrl', function($scope, $stateParams, Places) {
  $scope.place = Places.get($stateParams.placeId);
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
