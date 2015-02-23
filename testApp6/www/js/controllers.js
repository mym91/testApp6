
	var customIcon = L.Icon.extend({
		options: {
			iconUrl: 'img/leaflet/icon-default.png',
			iconRetinaUrl: 'img/leaflet/icon-default-2x.png',
			iconSize: [25, 41],
			iconAnchor: [0, 35],
			popupAnchor: [-10, -42],
			shadowUrl: 'img/leaflet/marker-shadow.png',
			shadowRetinaUrl: 'img/leaflet/marker-shadow.png',
			shadowSize: [41, 41],
			shadowAnchor: [0, 35]
		}
	});
	
	var iconCat1 = new customIcon({iconUrl: 'img/leaflet/icon-restaurant.png', iconRetinaUrl: 'img/leaflet/icon-restaurant-2x.png'}),
		iconCat2 = new customIcon({iconUrl: 'img/leaflet/icon-culture.png', iconRetinaUrl: 'img/leaflet/icon-culture-2x.png'}),
		iconCat3 = new customIcon({iconUrl: 'img/leaflet/icon-religion.png', iconRetinaUrl: 'img/leaflet/icon-religion-2x.png'}),
		iconCat4 = new customIcon({iconUrl: 'img/leaflet/icon-family.png', iconRetinaUrl: 'img/leaflet/icon-family-2x.png'}),
		iconCat5 = new customIcon({iconUrl: 'img/leaflet/icon-shopping.png', iconRetinaUrl: 'img/leaflet/icon-shopping-2x.png'}),
		iconDefault = new customIcon({iconUrl: 'img/leaflet/icon-default.png', iconRetinaUrl: 'img/leaflet/icon-default-2x.png'}),
		iconCurrent = new customIcon({iconUrl: 'img/leaflet/icon-current.png', iconRetinaUrl: 'img/leaflet/icon-current-2x.png',iconSize: [38, 62],iconAnchor: [19, 62],shadowAnchor: [38, 62]});
		

angular.module('starter.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('tab.map');
	window.localStorage['skipIntro'] = true;
  };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('MapCtrl', function($scope, Places) {
	
	$scope.toIntro = function(){
		window.localStorage['skipIntro'] = "false";
		$state.go('intro');
	}
	
	var mapM = L.map("map-canvas").setView([47.331611, 9.407531], 17);
	
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
			case 5: 
				icon = iconCat5;
			break;				
		}
		
		marker[cat].push(L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/places/'+places[i].id+'">mehr</a>'));
	}
		
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapM);
	
	var base = {};
	L.control.layers(base, {
		"Restaurants":L.layerGroup(marker[1]),
		"Kultur": L.layerGroup(marker[2]),
		"Kirchen": L.layerGroup(marker[3]),
		"Familie": L.layerGroup(marker[4]),
		"Einkaufen": L.layerGroup(marker[5])
	}).addTo(mapM);
		
	var locateStyle = {
		circleStyle: {
            color: '#b9d52f',
            fillColor: '#b9d52f',
            fillOpacity: 0.15,
            weight: 0,
            opacity: 0.5
        },
        markerStyle: {
            color: '#b9d52f',
            fillColor: '#b9d52f',
            fillOpacity: 0.7,
            weight: 2,
            opacity: 0.9,
            radius: 5
        }
	};
    L.control.locate(locateStyle).addTo(mapM);
		
})
	

.controller('MapDetailCtrl', function($scope, $stateParams, Places) {
  $scope.place = Places.get($stateParams.placeId);
	
	var place =  $scope.place;
	
	var mapMD = L.map("map-detail-canvas").setView([place.lat, place.lng], 17);
	L.marker([place.lat, place.lng], {icon: iconDefault}).addTo(mapMD);
		
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapMD);
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
	var curPlace;

	var mapTPD = L.map("map-tour-place-detail-canvas");
	
	for (var i = 0; i < places.length; i++) {
		icon = iconDefault;
		if($stateParams.placeId == places[i].id) {
			curPlace = places[i];
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
		L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/places/'+places[i].id+'">mehr</a>').addTo(mapTPD);
	}
	
	mapTPD.setView([curPlace.lat, curPlace.lng], 17);
	
	L.tileLayer('/map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapTPD);
	
  	var polyline = L.polyline(tour.line, {color: '#A3B256'}).addTo(mapTPD);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    skipIntro: window.localStorage['skipIntro']
  };
  
  $scope.toggleCheckbox = function() {
	  window.localStorage['skipIntro'] = $scope.settings.skipIntro;
  };
});
