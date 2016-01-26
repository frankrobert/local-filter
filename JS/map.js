var map;
var geocoder;
var infowindow;
var service;
var marker;

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
		infoWindow.setContent(null);
		stationView.reset();
		map.panTo(mapCenter);
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
	infoWindow = new google.maps.InfoWindow({
		maxWidth: 300 
	});

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
		},

	});

	google.maps.event.addListener(marker, 'click', function(i) {
		service.getDetails(place, function(result, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error(status);
				return;
			}
			stationView.flickrData(result);

			setTimeout(function() {
			infoWindow.setContent(stationView.getContent(result, stationView.flickrHTML()));
			}, 800);

			infoWindow.open(map, marker);
			map.panTo(marker.getPosition());

			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				marker.setAnimation(null);
			}, 3000);

			stationView.setStation(result);
		});
	});

	map.addListener('click', function(event) {
		marker.setAnimation(null);
	});
	return marker;
}