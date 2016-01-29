var stationView;

var ViewModel = function() {
	var self = this;
	this.stationList = ko.observableArray([]);
	this.currentStation = ko.observable(self.stationList()[0]);
	this.filterText = ko.observable("");
	this.flickrHTML = ko.observable();
	this.toggleValue = ko.observable();

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
		infoWindow.setContent(null);
		self.toggleValue(0);
	};
	// use this to set the current station based on click
	this.setStation = function(clickedStation) {
		self.currentStation(clickedStation);
		//		OPEN INFO WINDOW ON CLICK
		google.maps.event.trigger(clickedStation.marker, 'click');
		infoWindow.open();
		self.toggleValue(1);
	};

	// flickr API function
	this.flickrData = function(stationName) {
		var APIKey = 'eeed331e9b23f0d61bcc98f32725ce60';
		var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + APIKey + '&text=' + stationName.name + '&format=json&nojsoncallback=1';
		$.getJSON(flickrAPI).success(
			function(data) {

				var photoURL = 'https://farm' + data.photos.photo[0].farm + '.staticflickr.com/' + data.photos.photo[0].server + '/' + data.photos.photo[0].id + '_' + data.photos.photo[0].secret + '_m.jpg';
				self.flickrHTML(photoURL);
				//				console.warn(photoURL);
				return photoURL;

			}).fail(
			function(e) {
				console.warn('Failure To Receive Data');
				infoWindow.setContent('Failure To Receive Data');
			});
	};

	// to use for the flickrAPI and the infowindow
	this.getContent = function(station, url) {
		var infoContent;

		infoContent = '<div id="iw-container"><h2 class="iw-title"><b>' + station.name + '</b></h2><img class="iw-img" src=' + url + ' onError=this.src="metro.jpg" /></div>';

		return infoContent;
	};

	// use this for slide
	this.slide = function() {

		if (self.toggleValue() === 1) {
			self.toggleValue(0);
		} else {
			self.toggleValue(1);
		}
	};
};

// new viewmodel in the global scope
stationView = new ViewModel();

// wait for DOM to load.
document.addEventListener('DOMContentLoaded', function(event) {
	ko.applyBindings(stationView);

	// remove refresh from form (pressing 'enter' / button)
	$('form').submit(false);

	// set the filter-bar to the nav-bar's width
	var pos = $('.nav-bar').width();
	$('.filter-bar').css('width', pos);
});