/*

require.config({
    paths : {
        //create alias to plugins (not needed if plugins are on the baseUrl)
        async: 'lib/async',
        goog: 'lib/goog',
        propertyParser: 'lib/propertyParser',
        font: 'lib/font',
        knockout: 'knockout'
    }
});

//use plugins as if they were at baseUrl
define([
		'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCjjXXr2R7GjWAsmbalUcvwd5I0tqLNuig&libraries=places&callback=initMap',
        'goog!search,1',
        'font!google,families:[Montserrat]',
        'knockout'
    ], function(){
        //all dependencies are loaded (including gmaps and other google apis)
    }
);


*/

var appModel = {

	locationModel: [

		// angrignon 
		{
			placeId: 'ChIJ1dO3t-MQyUwRfxroO7oF_Gk'
		},
		// monk
		{
			placeId: 'ChIJnakMhfoQyUwRuLJieS3YZw4'
		},
		// jolicoeur
		{
			placeId: 'ChIJlfO3rvUQyUwRELV-FnFwuB4'
		},
		// verdun
		{
			placeId: 'ChIJpxXXt2AQyUwR7IuapljK3-E'
		},
		// de l'eglise
		{
			placeId: 'ChIJ85ZBm2YQyUwRbpt3EAwTR2M'
		},
		// lasalle
		{
			placeId: 'ChIJgwYTPnwQyUwRMWNIlONF49A'
		},
		// charlevoix
		{
			placeId: 'ChIJifVaon8ayUwRkywkhR1agC0'
		},
		// lionel-groulx
		{
			placeId: 'ChIJ8xdUMHcayUwR6M1HNDWRY5g'
		}
	]
};


var geoResultAddress = [];

var ViewModel = function() {
	var self = this;

	var Place = function(data) {
		this.name = data.name;
		this.viscinity = data.viscinity;
	};

	self.stationList = ko.observableArray([]).extend({
		notify: 'always'
	});

//	self.stationPush = function() {
		geoResultAddress.forEach(function(placeitem) {
			self.stationList.push(new Place(placeitem));
		});
//	};
/*
	self.stationList.extend({
		notify: 'always'
	});
	self.stationList.extend({
		rateLimit: 100
	});
*/
	/*
	var input = document.getElementById('myInput');
		new Awesomplete(input, {
			list: myList,
			filter: Awesomplete.FILTER_STARTSWITH
		});

		window.addEventListener("awesomplete-select", function(e) {
			self.searchQuery(e.text);
		});
	*/
};

window.onload = function(){
ko.applyBindings(new ViewModel());
};