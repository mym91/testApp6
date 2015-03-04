angular.module('starter.services', [])

.factory('Tours', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tours = [{
    id: 0,
    name: 'Familientour',
    info: 'Ein Tagesprogramm für die ganze Familie',
    description: 'Die Familientour bietet neben einem ',
	places: [0,8,9,10],
	line: [[47.330393,9.409626],[47.330503, 9.409831]]
  }, {
    id: 1,
    name: 'Kultureller Dorfrundgang',
    info: 'Der klassische Dorfrundgang',
    description: 'Lernen sie die schönsten, historischen Gebäude und Plätze kennen.',
	places: [6,13,14,5,15,4,16,17],	
	line: [
		[47.330748, 9.410069],	// Kirche 
		[47.330750, 9.410835],	// Hechtplatz
		[47.330344, 9.410672],	// Gerbergasse
		[47.330204, 9.410484],	// Gerbergasse 
		[47.330083, 9.410042],	// Gerbergasse
		[47.330187, 9.409739],	// Gerbergasse-Poststrasse
		[47.330094, 9.409578], 	// Poststrasse
		[47.330004, 9.409107], 	// Salesis
		[47.330116, 9.408796], 	// Postplatz-Unterer Gansbach
		[47.330135, 9.408577],	// Unterer Gansbach
		[47.330240, 9.408397],	// Unterer Gansbach
		[47.330329, 9.407774],	// Unterer Gansbach
		[47.330351, 9.407650],	// Engelgasse-Unterer Gansbach
		[47.330737, 9.407699],	// Konkordia
		[47.330855, 9.406820],	// Hampi Fässler
		[47.330930, 9.406930],	// Engelgasse-Kronengarten
		[47.331189, 9.406943],	// Kronengarten
		[47.331445, 9.407265],	// Landsgemeindeplatz
		[47.331458, 9.407530],	// Landsgemeindeplatz
		[47.331192, 9.407752],	// Engelgasse-Hauptgasse
		[47.331020, 9.408408],	// Hauptgasse Margreiter
		[47.330795, 9.408756],	// Plattenegg
		[47.330760, 9.409420],	// Hauptgasse
		[47.330748, 9.410069]	// Kirche
	]
  }];

  return {
    all: function() {
      return tours;
    },
    get: function(tourId) {
      for (var i = 0; i < tours.length; i++) {
        if (tours[i].id === parseInt(tourId)) {
          return tours[i];
        }
      }
      return null;
    }
  };
})

/**
 * A simple example service that returns some data.
 */
.factory('Places', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  
 var places = [{
    id: 0,
    name: 'Café Fässler',
    lat: 47.330841,
    lng: 9.409084,
    info: 'Café mit eigener Chocolaterie Manufactur',
	video: 'video',
	cat: 1
  }, {
    id: 1,
    name: 'Drei König',
    lat: 47.331019,
    lng: 9.408550,
    info: 'Café und Bäckerei',
	cat: 1
  }, {
    id: 2,
    name: 'Gass 17',
    lat: 47.330600,
    lng: 9.409540,
    info: 'Am offenen Holzgrill über knisterndem Buchenholzfeuer, auf dem traditionellen Holzherd oder direkt aus dem Holzofen kreieren die Köche traumhafte Gerichte aus weitgehend regionalen Produkten. Alteingebrachte Rezepte vereinen sich mit modernen Elementen.',
	cat: 1
  }, {
    id: 3,
    name: 'Mountain',
    lat: 47.330347,
    lng: 9.408682,
    info: 'Bar',
	cat: 1
  }, {
    id: 4,
    name: 'Landsgemeindeplatz',
    lat: 47.331611,
    lng: 9.407531,
    info: 'historischer Platz',
	description: 'Auf dem historischen Landsgemeindeplatz findet alljährlich die Landsgemeinde statt. Dabei wird über alle kantonalen Wahlgeschäfte und Sachvorlagen beraten und mit offenem Handmehr abgestimmt.',
	cat: 2
  }, {
    id: 5,
    name: 'Haus Konkordia',
    lat: 47.330658,
    lng: 9.407531,
    info: 'historisches Patrizierhaus',
	description: 'Besonders markant ist das Haus Konkordia an der Engelgasse, ein Patrizierhaus aus dem 17. Jahrhundert mit steilem Giebeldach. Eine reiche ornamental dekorierte Täferbemalung überzieht die ganze Südfassade. Auf der Hohlkehle der Dachuntersicht sind die acht Lebensalter dargestellt. Diese lebhafte, farblich dezente Bemalung geht auf August Schmid (1930) zurück.',
	cat: 2
  }, {
    id: 6,
    name: 'Kirche St. Mauritius',
    lat: 47.330924,
    lng: 9.410245,
    info: 'katholische Kirche',
	description: 'Die stattliche katholische Kirche lässt mit ihrem Stilreichtum auf eine vielfältige Baugeschichte schliessen. Die erste Kirche auf diesem Platz ist bereits 1071 mit der Gründung der Pfarrei erwähnt. Sie ist dem St. Mauritius geweiht, deswegen wird sie von Einheimischen auch «de Moritz» genannt. Unweit der katholischen Kirche befindet sich auch die evangelische Kirche, dazwischen liegt der aussergewöhnlich schön angelegte Friedhof.',
	cat: 3
  }, {
    id: 7,
    name: 'Lourdes Kapelle',
    lat: 47.333470,
    lng: 9.411984,
    info: 'ein stiller Ort',
	description: 'Sie wurde 1594 als Siechenkapelle St. Martin erbaut und befand sich damals noch ausserhalb des Dorfes. In der Nähe befanden sich das Sondersiechenhaus und das Armenhaus. Das Sondersiechenhaus wurde im 18. Jahrhundert abgebrochen und für das Armenhaus entstand zwischen 1901 und 1903 an der Sonnenhalde ein Neubau. Damit verlor die Kapelle ihre Bedeutung und wurde 1904 geschlossen. Der Lourdesverein übernahm danach den Bau und eröffnete 1936 die Kapelle als Lourdeskapelle neu.',
	cat: 3
  }, {
    id: 8,
    name: 'Spielplatz Brauereiplatz',
    lat: 47.329901,
    lng: 9.413503,
    info: 'Schöner, natürlicher Spielplatz.',
	images: ['DSC_0295.JPG','DSC_0301.JPG','DSC_0308.JPG'],
	cat: 4
  }, {
    id: 9,
    name: 'Bazar Hersche',
    lat: 47.330305,
    lng: 9.409551,
    info: 'Spielwarengeschäft',
	cat: 5
  }, {
    id: 10,
    name: 'Lokal',
    lat: 47.330503,
	lng: 9.409833,
    info: 'Gelateria und Foccaceria',
	cat: 1
  }, {
    id: 11,
    name: 'Säntis Fashion',
    lat: 47.330827,
	lng: 9.408532,
    info: 'Jeans & junge Mode',
	cat: 5
  }, {
    id: 12,
    name: 'Freudenberg',
    lat: 47.325533,
	lng: 9.403989,
    info: 'familienfreundliches Aussichts-Restaurant',
	pano: 'panorama.jpg',
	cat: 1
  }, {
    id: 13,
    name: 'Schloss',
    lat: 47.329965,
	lng: 9.409490,
    info: '',
	description: 'Dem ummauerten sogenannten Schloss im Osten des Postplatzes kommt seit jeher in der appenzellischen Dorfarchitektur eine einzigartige Stellung zu. Es ist seit 1780 im Privatbesitz der Familie Sutter und wird auch von ihr bewohnt. Die Innenräume sind nicht öffentlich zugänglich. Direkt angrenzend an das Schloss liegt das Kloster Maria der Engel. Die Schwesterngemeinschaft baute in den frühen 80er-Jahren des 17. Jahrhunderts dieses Kloster.',
	cat: 2
  }, {
    id: 14,
    name: 'Haus Salesis',
    lat: 47.329904,
	lng: 9.408921,
    info: 'Haus aus dem späten 16. Jahrhundert',
	description: 'Das Haus Salesis am Postplatz ist als einziger freistehender Steinbau nebst dem Schloss ein markanter Zeuge dörflichen Patriziats. Der dreigeschossige, massige Baukubus aus verputztem Bruchsteinmauerwerk mit breitem Satteldach stammt aus der grossen Wiederaufbauzeit im späten 16. Jahrhundert.',
	cat: 2
  }, {
    id: 15,
    name: 'Haus Hampi Fässler',
    lat: 47.330791,
	lng: 9.406400,
    info: 'Riegelhaus',
	description: 'Das Haus Hampi Fässlers an der Kaustrasse bildete ursprünglich den Abschluss des alten Dorfkerns. Die sichtbare Riegelkonstruktion zieren barocke Fensterrahmen und von Adalbert Fässler dekorativ bemalte Zugladenkästen.',
	cat: 2
  }, {
    id: 16,
    name: 'Kappelle Heiligkreuz',
    lat: 47.331214,
	lng: 9.407977,
    info: 'Kappelle',
	description: 'Die Heiligkreuzkapelle an der Hauptgasse wurde nach dem verheerenden Dorfbrand 1560 wieder aufgebaut. Die Glasfenster mit den fünf Geheimnissen des schmerzhaften Rosenkranzes schuf Ferdinand Gehr 1964. ',
	cat: 2
  }, {
    id: 17,
    name: 'Rathaus',
    lat: 47.330838,
	lng: 9.409705,
    info: '',
	description: 'Die Hauptgasse mit ihren schmucken, farbenfrohen Häusern ist immer ein einzigartiger Anziehungspunkt für die Gäste. Das imposante Rathaus mir der Fassadenmalerei von August Schmid aus Diessenhofen (1928) und das angebaute «Buherre Hanisefs» bilden den Abschluss des Rundgangs. ',
	cat: 2
  }];		
  
  return {
    all: function() {
      return places;
    },
    getSelected: function(placesArr) {
      var selectedPlaces = [];
	  for (var x = 0; x < placesArr.length; x++)  {
		  for (var i = 0; i < places.length; i++) {
			if (placesArr[x] == places[i].id) {
				selectedPlaces.push(places[i]);
			}
		  }
	  }
      return selectedPlaces;
    },
    get: function(placeId) {
      for (var i = 0; i < places.length; i++) {
        if (places[i].id === parseInt(placeId)) {
          return places[i];
        }
      }
      return null;
    }
  };
})

.factory('Favorites', function($localstorage) {
	if($localstorage.getObject('Favorites')) {
		var favorites = $localstorage.getObject('Favorites');
	} else {
		var favorites = [];
	}
	return {
		all: function() {
			return favorites;
		},
		add: function(favorite) {
			//console.log(favorites);
			favorites[favorite.id] = favorite;
		//	favorites.push(favorite);
			$localstorage.setObject('Favorites', favorites);
		},
		remove: function(favorite) {
			//favorites.splice(favorite, 1);
			delete favorites[favorite.id];
			$localstorage.setObject('Favorites', favorites);
		},
		get: function(favoriteId) {
			return favorites[favoriteId];
			/*
			for (var i = 0; i < favorites.length; i++) {
				if (favorites[i].id === parseInt(favoriteId)) {
					return favorites[i];
				}
			}
			return null;
			*/
		}
	};
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}]);