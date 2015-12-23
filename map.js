var map;
var geocoder;
var infowindow;
// var markers = [];

// initMap function (mandatory??)
var initMap = function() {
	var mapCenter = {
		lat: 45.501689,
		lng: -73.567256
	};
	map = new google.maps.Map(document.getElementById('map'), {
		center: mapCenter,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	});

	// adding geocoding to turn lat+long into address
	geocoder = new google.maps.Geocoder();

	// This event listener will call addMarker() when the map is clicked.
	map.addListener('dblclick', function(event) {
		addMarker(event.latLng);
	});

	// Adds a marker at the center of the map.
	addMarker(mapCenter);

	// styling options for map
	map.setOptions({
		styles: styles
	});
	/*
		// adds new markers from the appModel
		for (var i = 0; i < appModel.locationModel.length; i++) {
			addMarker(appModel.locationModel[i]);
		}
	*/


	// infowindow for markers
	infowindow = new google.maps.InfoWindow();

	// places library call to start service
	var service = new google.maps.places.PlacesService(map);

	for (var i = 0; i < appModel.locationModel.length; i++) {
		service.getDetails(appModel.locationModel[i], callback);
	}
};

function callback(place, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			animation: google.maps.Animation.DROP
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent('<div><strong>' + place.name + '</strong>' + '</div>');
			infowindow.open(map, this);
		});

//		geoResultAddress.push(place.name, place.geometry.location);
		geoResultAddress.push({
                'name': place.name,
                'location': place.geometry.location
            });
	}
}

/*

	// geocoder waiting for result from the form
	document.getElementById('location-content').addEventListener('click', function() {
		geocodeLatLng(geocoder, map);
	});
*/

// reverse geo-codes the long+lat into an address

// TO DO - change to consider user input AND map marker
/*
var getReverseGeocodingData = function(lat, lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var address;
	// This is making the Geocode request
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'latLng': latlng
	}, function(results, status) {
		if (status !== google.maps.GeocoderStatus.OK) {
			alert(status);
		}
		// This is checking to see if the Geoeode Status is OK before proceeding
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results);
			var address = (results[0].formatted_address);
			appModel.geoResultAddress.push(address);
		}
	});
	console.log(getReverseGeocodingData());
};

*/
/*
function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

}
*/

// code from Google API samples, modified.
// Adds a marker to the map and push to the array.
var addMarker = function(location) {
	var marker = new google.maps.Marker({
		map: map,
		position: location,
		animation: google.maps.Animation.DROP
	});
	//	push to the locationModel for new locations in the future
	//	appModel.locationModel.push(marker.getPosition());
};


// Sets the map on all markers in the array.
var setMapOnAll = function(map) {
	for (var i = 0; i < appModel.locationModel.length; i++) {
		appModel.locationModel[i].setMap(map);
	}
};

// beginning of single pin removal
// come back to this


/*
markers.addListener('dblclick', function(event){
	this.setMap(null);
});
*/


// Removes the markers from the map, but keeps them in the array.
var clearMarkers = function() {
	setMapOnAll(null);
};

// Shows any markers currently in the array.
var showMarkers = function() {
	setMapOnAll(map);
};

// Deletes all markers in the array by removing references to them.
var deleteMarkers = function() {
	clearMarkers();
	appModel.locationModel = [];
};