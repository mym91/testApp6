
	var customIcon = L.Icon.extend({
		options: {
			iconUrl: 'img/leaflet/icon-default.png',
			iconRetinaUrl: 'img/leaflet/icon-default-2x.png',
			iconSize: [25, 41],
			iconAnchor: [0, 35],
			popupAnchor: [12, -40],
			shadowUrl: 'img/leaflet/marker-shadow.png',
			shadowRetinaUrl: 'img/leaflet/marker-shadow.png',
			shadowSize: [41, 41],
			shadowAnchor: [0, 35]
		}
	});
	
	var icons = {
		1: {
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-restaurant.png', iconRetinaUrl: 'img/leaflet/icon-restaurant-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-restaurant-inact.png', iconRetinaUrl: 'img/leaflet/icon-restaurant-inact-2x.png'})
		},	
		2: {
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-culture.png', iconRetinaUrl: 'img/leaflet/icon-culture-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-culture-inact.png', iconRetinaUrl: 'img/leaflet/icon-culture-inact-2x.png'})
		},	
		3: {
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-religion.png', iconRetinaUrl: 'img/leaflet/icon-religion-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-religion-inact.png', iconRetinaUrl: 'img/leaflet/icon-religion-inact-2x.png'})
		},	
		4: {
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-family.png', iconRetinaUrl: 'img/leaflet/icon-family-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-family-inact.png', iconRetinaUrl: 'img/leaflet/icon-family-inact-2x.png'})
		},	
		5: {
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-shopping.png', iconRetinaUrl: 'img/leaflet/icon-shopping-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-shopping-inact.png', iconRetinaUrl: 'img/leaflet/icon-shopping-inact-2x.png'})
		},
		'default': {			
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-default.png', iconRetinaUrl: 'img/leaflet/icon-default-2x.png'}),
			'inact': new customIcon({iconUrl: 'img/leaflet/icon-default-inact.png', iconRetinaUrl: 'img/leaflet/icon-default-inact-2x.png'})
		},
		'current': {			
			'act': 	new customIcon({iconUrl: 'img/leaflet/icon-current.png', iconRetinaUrl: 'img/leaflet/icon-current-2x.png',iconSize: [38, 62],iconAnchor: [19, 62],shadowAnchor: [12, 42], zIndexOffset: 1000}),
		}
	};

angular.module('starter.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $localstorage) {
 
  // Called to navigate to the main app
  
	if($localstorage.get('skipIntro')) {
    	$state.go('tab.map');
	}
	$scope.startApp = function() {
		$state.go('tab.map');
		$localstorage.set('skipIntro', true);
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

.controller('MapCtrl', function($scope, $state, Places, $localstorage) {
	
	if($localstorage.get('skipIntro') == false) {
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
		
		var icon = icons['default']['act'];
		
		if (icons[cat]['act']) {
			icon = icons[cat]['act'];
		}
		marker[cat].push(L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/places/'+places[i].id+'">mehr</a>'));
	}
		
	L.tileLayer('map/{z}/{x}/{y}.png', {
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
	

.controller('MapDetailCtrl', function($scope, $state, $stateParams, Places, Favorites) {
	$scope.place = Places.get($stateParams.placeId);
	
	$scope.updateFavoriteButton = function() {
		if(Favorites.get($stateParams.placeId)) {
			$scope.isFavorite = true;
		} else {
			$scope.isFavorite = false;
		}
	};
	
	var place =  $scope.place;
	
	var newNode=document.createElement('div');
	newNode.setAttribute("id", "map-detail-canvas");	
	newNode.setAttribute("style", "min-height:200px; height:100%;");		
    var oldNode = document.getElementById('map-detail-canvas');
    oldNode.parentNode.replaceChild(newNode, oldNode);
	
	var mapMD = L.map("map-detail-canvas").setView([place.lat, place.lng], 17);
	L.marker([place.lat, place.lng], {icon: icons[place.cat]['act']}).addTo(mapMD);
		
	L.tileLayer('map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapMD);
	
	// Favoriten
	$scope.addToFavorites = function() {
		Favorites.add(place);
		$scope.updateFavoriteButton();
	};
	$scope.removeFromFavorites = function() {
		Favorites.remove(place);
		$scope.updateFavoriteButton();
	};
})

.controller('ToursCtrl', function($scope, Tours) {
  $scope.tours = Tours.all();
})

.controller('TourDetailCtrl', function($scope, $stateParams, Tours, Places) {
  $scope.tour = Tours.get($stateParams.tourId);
  $scope.places = Places.getSelected($scope.tour.places);
  
  	var tour = $scope.tour;
	var places = $scope.places;
	var mapTD = L.map("map-tour-detail-canvas");
	
	for (var i = 0; i < places.length; i++) {
		var cat = places[i].cat;
		var icon = icons['default']['act'];
		
		if (icons[cat]['act']) {
			icon = icons[cat]['act'];
		}
		
		L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/tours/'+tour.id+'/place/'+places[i].id+'">mehr</a>').addTo(mapTD);
	}
	
	mapTD.setView([places[0].lat, places[0].lng], 16);
	
	L.tileLayer('map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapTD);
	
  	L.polyline(tour.line, {color: '#A3B256'}).addTo(mapTD);
})

.controller('TourPlaceDetailCtrl', function($scope, $state, $stateParams, Tours, Places, Favorites) {
  $scope.tour = Tours.get($stateParams.tourId);
  $scope.places = Places.getSelected($scope.tour.places);
  $scope.place = Places.get($stateParams.placeId);

	$scope.updateFavoriteButton = function() {
		if(Favorites.get($stateParams.placeId)) {
			$scope.isFavorite = true;
		} else {
			$scope.isFavorite = false;
		}
	};
	
	
  	var tour = $scope.tour;
	var places = $scope.places;
	var curPlace;
	
	var newNode=document.createElement('div');
	newNode.setAttribute("id", "map-tour-place-detail-canvas");	
	newNode.setAttribute("style", "min-height:200px; height:100%;");		
    var oldNode = document.getElementById('map-tour-place-detail-canvas');
    oldNode.parentNode.replaceChild(newNode, oldNode);
	
	var mapTPD = L.map("map-tour-place-detail-canvas");
	
	for (var i = 0; i < places.length; i++) {
	
		var icon = icons['default']['act'];
		if($stateParams.placeId == places[i].id) {
			curPlace = places[i];
			
			icon = icons['current']['act'];
		} else {
			var cat = places[i].cat;
		
			if (icons[cat]['act']) {
				icon = icons[cat]['inact'];
			}
			
		}
		L.marker([places[i].lat, places[i].lng], {icon: icon}).bindPopup(places[i].name+'<br/>'+places[i].info+'<br/><a title="Detail" href="#/tab/tours/'+tour.id+'/place/'+places[i].id+'">mehr</a>').addTo(mapTPD);
	}
	
	mapTPD.setView([curPlace.lat, curPlace.lng], 16);
	
	L.tileLayer('map/{z}/{x}/{y}.png', {
		minZoom: 16,
		maxZoom: 20,
		tms: true
	}).addTo(mapTPD);
	
  	L.polyline(tour.line, {color: '#A3B256'}).addTo(mapTPD);
	
	
	// Favoriten
	$scope.addToFavorites = function() {
		Favorites.add(curPlace);
		$scope.updateFavoriteButton();
	};
	$scope.removeFromFavorites = function() {
		Favorites.remove(curPlace);
		$scope.updateFavoriteButton();
	};

  //

})

.controller('FavoritesCtrl', function($scope, Favorites) {
	$scope.favorites = Favorites.all();
})
.controller('AccountCtrl', function($scope,$localstorage) {
  $scope.settings = {
    skipIntro: $localstorage.get('skipIntro')
  };
  
  $scope.toggleCheckbox = function() {
	  $localstorage.set('skipIntro', $scope.settings.skipIntro);	  
  };
});