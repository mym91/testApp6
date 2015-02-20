angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
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
    info: '<p>Café mit eigener Chocolaterie Manufactur</p>',
	cat: 1,
	tours: [1,4]
  }, {
    id: 1,
    name: 'Drei König',
    lat: 47.331019,
    lng: 9.408550,
    info: '<p>Café und Bäckerei</p>',
	cat: 1,
	tours: []
  }, {
    id: 2,
    name: 'Gass 17',
    lat: 47.330613,
    lng: 9.409521,
    info: '<p>Café und Bäckerei</p>',
	cat: 1,
	tours: []
  }, {
    id: 3,
    name: 'Mountain',
    lat: 47.330339,
    lng: 9.408706,
    info: '<p>Bar</p>',
	cat: 1,
	tours: []
  }, {
    id: 4,
    name: 'Landsgemeindeplatz',
    lat: 47.331611,
    lng: 9.407531,
    info: '<p>Bar</p>',
	cat: 2,
	tours: [2]
  }, {
    id: 5,
    name: 'Concordia',
    lat: 47.330615,
    lng: 9.407606,
    info: '<p>Bar</p>',
	cat: 2,
	tours: [2]
  }, {
    id: 6,
    name: 'Kirche St. Mauritius',
    lat: 47.330924,
    lng: 9.410245,
    info: '<p>Bar</p>',
	cat: 3,
	tours: [3]
  }, {
    id: 7,
    name: 'Kapelle',
    lat: 47.333470,
    lng: 9.411984,
    info: '<p>Bar</p>',
	cat: 3,
	tours: [3]
  }, {
    id: 8,
    name: 'Spielplatz Brauereiplatz',
    lat: 47.329598,
    lng: 9.413900,
    info: '<p>Schöner, natürlicher Spielplatz.</p>',
	cat: 4,
	tours: [4]
  }];			

  return {
    all: function() {
      return places;
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
