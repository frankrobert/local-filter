var map;
var geocoder;
var infowindow;
var service;

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

	// event listener to close any open infowindows on map click
	map.addListener('click', function(event) {
		infoWindow.close();
	});

	// styling options for map
	map.setOptions({
		styles: styles
	});

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
	results.forEach(function(result) {
		// if the word 'station' is included for more precise results.
		if (result.name.toLowerCase().indexOf('station') === 0) {
//			var marker = addMarker(result);
			// push the marker data to the results
			result.marker = addMarker(result);
			// create a property for my stationList to keep track of whether it is visible
			result.isVisible = ko.observable(true);
			stationView.stationList.push(result);
		}
	});
	//check if there's another page
	if (pagination.hasNextPage) {
		setTimeout(pagination.nextPage.bind(pagination), 2000);
	}

}

function addMarker(place) {
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP,
		icon: {
			url: 'underground.png',
			anchor: new google.maps.Point(10, 10),
			scaledSize: new google.maps.Size(24, 31)
		}
	});

	google.maps.event.addListener(marker, 'click', function() {
		service.getDetails(place, function(result, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error(status);
				return;
			}
//	get FLICKR data on marker click --> switch to oauth
//			flickrData(place.name);
			infoWindow.setContent(result.name, result.viscinity);
			//  "https://farm" + {farm-id} + ".staticflickr.com/" + {server-id} + "/" + {id} + "_" + {secret} + "_m.jpg"
			infoWindow.open(map, marker);
			//			marker.setVisible(false);									// use this method to make them disappear during filter ONCE you have the click binding working.
		});
	});
	return marker;
}