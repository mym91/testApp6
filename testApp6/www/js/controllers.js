
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
		iconDefault = new customIcon({iconUrl: 'img/leaflet/icon-default.png', iconRetinaUrl: 'img/leaflet/icon-default-2x.png'}),
		iconCurrent = new customIcon({iconUrl: 'img/leaflet/icon-default.png', iconRetinaUrl: 'img/leaflet/icon-default-2x.png'});
		

angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, Places) {
		
	var map = L.map("map-canvas").setView([47.331611, 9.407531], 17);
	
	var places = Places.all();
	

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
	
	var place =  $scope.place;
	var map = L.map("map-canvas").setView([place.lat, place.lng], 17);
	L.marker([place.lat, place.lng], {icon: iconDefault}).addTo(map);
		
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(map);
})

.controller('ToursCtrl', function($scope, Tours) {
  $scope.tours = Tours.all();
})

.controller('TourDetailCtrl', function($scope, $stateParams, Tours, Places) {
  $scope.tour = Tours.get($stateParams.tourId);
  $scope.places = Places.getSelected($scope.tour.places);
})

.controller('TourPlaceDetailCtrl', function($scope, $stateParams, Tours, Places) {
  $scope.tour = Tours.get($stateParams.tourId);
  $scope.places = Places.getSelected($scope.tour.places);
  $scope.place = $scope.places[$stateParams.placeId];
  	var tour = $scope.tour;
	var places = $scope.places;
	var curPlace = $scope.place;
	
	var map = L.map("map-canvas").setView([curPlace.lat, curPlace.lng], 17);
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(map);
  
	for (var i = 0; i < places.length; i++) {
		icon = iconDefault;
		if($scope.place.id == places[i].id) {
			icon = iconCurrent;
		} else {
			switch (places[i].cat) {
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
		}
		L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/places/'+places[i].id+'">mehr</a>').addTo(map);
	}
  	var polyline = L.polyline(tour.line, {color: 'red'}).addTo(map);
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
