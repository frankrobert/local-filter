var map;
var geocoder;
var infowindow;
var service;
// var markers = [];

// initMap function (mandatory??)
var initMap = function() {
	var mapCenter = {
		lat: 45.501689,
		lng: -73.56725
	};
	map = new google.maps.Map(document.getElementById('map'), {
		center: mapCenter,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	});

	// adding geocoding to turn lat+long into address
	geocoder = new google.maps.Geocoder();

	// This event listener will call addMarker() when the map is clicked.
	//	map.addListener('dblclick', function(event) {
	//		addMarker(event.latLng);
	//	});

	// event listener to close any open infowindows on map click
	map.addListener('click', function(event) {
		infoWindow.close();
	});

	// Adds a marker at the center of the map.

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
	// The idle event is a debounced event, so we can query & listen without
	// throwing too many requests at the server.
	//  map.addListener('idle', performSearch);

	var request = {
		location: mapCenter,
		radius: '20000',
		keyword: 'station',
		types: ['subway_station']
	};


	// infowindow for markers
	infoWindow = new google.maps.InfoWindow();

	// places library call to start service
	service = new google.maps.places.PlacesService(map);

	/*
		for (var i = 0; i < appModel.locationModel.length; i++) {
			service.getDetails(appModel.locationModel[i], callback);
		}

	*/
	//nearby search
	service.nearbySearch(request, callback);
};

//async.series([
//callback returning the values of the nearbySearch
	function callback(results, status, pagination) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) {
			console.error(status);
			return;
		}

			results.forEach(function(result){
				// if the word 'station' is included for more precise results.
				if (result.name.toLowerCase().indexOf('station') === 0) {
					addMarker(result);
					geoResultAddress.push(result);
				}
			});
		//check if there's another page
		if (pagination.hasNextPage) {
		setTimeout(pagination.nextPage.bind(pagination), 2000);
		}
	}
//	ViewModel.stationPush()
//]);

function addMarker(place) {
	var delay = 1000;
	setTimeout(function() {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			animation: google.maps.Animation.DROP,
			icon: {
				url: 'underground.png',
				anchor: new google.maps.Point(10, 10),
				scaledSize: new google.maps.Size(15, 22)
			}
		});
		/*
			service.getDetails(place, function(result, status) {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
					console.error(status);
					return;
				}
		//		geoResultAddress.push(result);
			});
		*/
		google.maps.event.addListener(marker, 'click', function() {
			service.getDetails(place, function(result, status) {
				if (status !== google.maps.places.PlacesServiceStatus.OK) {
					console.error(status);
					return;
				}
				infoWindow.setContent(result.name, result.location);
				infoWindow.open(map, marker);
			});
		});
	}, delay);
}



// LOOP STYLE CALLBACK - reuse if thought to be needed.
// might be better than radar callback already being implemented.

/*
function callback(place, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			animation: google.maps.Animation.DROP,
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
		testPlace.push(place);
	}
}


*/
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
/*

var addMarker = function(location) {
	var marker = new google.maps.Marker({
		map: map,
		position: location,
		animation: google.maps.Animation.DROP
	});
	//	push to the locationModel for new locations in the future
	//	appModel.locationModel.push(marker.getPosition());
};

*/
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