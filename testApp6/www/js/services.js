angular.module('starter.services', [])

.factory('Tours', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tours = [{
    id: 0,
    name: 'Familientour',
    info: 'Ein Tagesprogramm für die ganze Familie',
    description: 'Die Familientour bietet neben einem ',
    img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
	places: [2,5,3],
	line: [[47.330393,9.409626],[47.330503, 9.409831]]
  }, {
    id: 1,
    name: 'Kultureller Dorfrundgang',
    info: 'Der klassische Dorfrundgang',
    description: 'Die Familientour bietet neben einem ',
    img: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
	places: [6,5,4],	
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
  }
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
  }
});
