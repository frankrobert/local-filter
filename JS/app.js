var stationView;


var ViewModel = function() {
	var self = this;
	this.stationList = ko.observableArray([]);
	this.currentStation = ko.observable(this.stationList[0]);
	this.filterText = ko.observable("");

	// filter function
	this.filteredItems = ko.computed(function() {
		var filter = self.filterText().toLowerCase();
		if (!filter) {
			return self.stationList();
		} else {
			return ko.utils.arrayFilter(self.stationList(), function(station) {
				var st = station.name.toLowerCase();
				if (st.search(filter) >= 0) {
					console.log(this.station.isVisible(true));
//					this.station.marker.visible = true;
				} else {
					console.log(this.station.isVisible(false));
//					this.station.marker.visible = false;
				}
			});
		}
	}, ViewModel);

	this.setStation = function(clickedStation) {
		self.currentStation(clickedStation);
	};
// flickr API function
	this.flickrData = function() {
		//test array to hold Flickr data
		var flickrArray = [];
		var APIKey = 'f4de1a10820c31e94afa5dd9c2386445';
		var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f4de1a10820c31e94afa5dd9c2386445&text=' +
// 		this.stationList() ????		
		+'&format=json&nojsoncallback=1&auth_token=72157663152403780-89cebc8ed31b78d8&api_sig=2c8b13fafd6ef7f7e07b5493075277fd';
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