var stationView;


var ViewModel = function() {
	var self = this;
	this.stationList = ko.observableArray([]);
	this.currentStation = ko.observable(self.stationList()[0]);
	this.filterText = ko.observable("");

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
			//			return ko.utils.arrayFilter(self.stationList(), function(station) {
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
	};
	// use this...?
	this.setStation = function(clickedStation) {
		self.currentStation(clickedStation);
		self.filterText(clickedStation.name);
//		
//		OPEN INFO WINDOW ON CLICK
// 		
//		self.currentStation().addEventListener('click', function() {
//			infowindow.open(map, marker);
//		});
	};
	// flickr API function
	this.flickrData = function(stationName) {
		//test array to hold Flickr data
		var flickrArray = [];
		var APIKey = 'f4de1a10820c31e94afa5dd9c2386445';
		var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4de1a10820c31e94afa5dd9c2386445&text=' +
			stationName + '&format=json&nojsoncallback=1&auth_token=72157663152403780-89cebc8ed31b78d8&api_sig=2c8b13fafd6ef7f7e07b5493075277fd';
		$.getJSON(flickrAPI).success(
			function(data) {


				console.log(data);

			}).fail(
			function(e) {
				console.log('Failure To Receive Data', e);
			});

		console.log('Request Sent');
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

$('form').submit(false);