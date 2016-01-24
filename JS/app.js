var stationView;

var ViewModel = function() {
	var self = this;
	this.stationList = ko.observableArray([]);
	this.currentStation = ko.observable(self.stationList()[0]);
	this.filterText = ko.observable("");
	//	this.flickrHTML = ko.observable("");

	// filter function
	this.filteredItems = ko.computed(function() {
		var filter = self.filterText().toLowerCase();
		if (!filter) {
			// if there's no filter text, set all markers and list items to visible
			self.stationList().forEach(function(station) {
				station.isVisible(true);
				station.marker.setVisible(true);
			});
			return self.stationList();
		} else {
			self.stationList().forEach(function(station) {
				var st = station.name.toLowerCase();
				if (st.search(filter) >= 0) {
					// if there's a match, set the matches to visible
					station.isVisible(true);
					station.marker.setVisible(true);
				} else {
					// set the non-matching results to invisible
					station.isVisible(false);
					station.marker.setVisible(false);
				}
			});
		}
	}, ViewModel);

	// when button is clicked, sets all stationList() items to isVisible(true);
	this.reset = function() {
		self.stationList().forEach(function(station) {
			station.isVisible(true);
			station.marker.setVisible(true);
		});
		self.filterText("");
		infoWindow.close();
	};
	// use this to set the current station based on click
	this.setStation = function(clickedStation) {
		self.currentStation(clickedStation);
		self.filterText(clickedStation.name);
		//		OPEN INFO WINDOW ON CLICK
		google.maps.event.trigger(clickedStation.marker, 'click');
		infoWindow.open();
		//		flickrData(clickedStation);
	};

	// flickr API function
	this.flickrData = function(stationName) {
		var APIKey = 'eeed331e9b23f0d61bcc98f32725ce60';
		var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + APIKey + '&text=' + stationName.name + '&format=json&nojsoncallback=1';
		$.getJSON(flickrAPI).success(
			function(data) {

				var photoURL = '<div><h2><b>' + stationName.name + '</b></h2><img src="https://farm' + data.photos.photo[0].farm + '.staticflickr.com/' + data.photos.photo[0].server + '/' + data.photos.photo[0].id + '_' + data.photos.photo[0].secret + '_m.jpg"></div>';
				return photoURL;
//				flickrHTML(photoURL);

			}).fail(
			function(e) {
				console.log('Failure To Receive Data', e);
			});
	};

};
//call viewmodel
ViewModel();
// new viewmodel in the global scope
stationView = new ViewModel;

// wait for DOM to load.
document.addEventListener("DOMContentLoaded", function(event) {
	ko.applyBindings(stationView);
});

// remove refresh from form (pressing 'enter' / button)
$('form').submit(false);

/*
Flickr data won't push to all separate stations.

currentStation only pushed AFTER initial click.

currentStation does NOT take marker data or flickr data.

*/