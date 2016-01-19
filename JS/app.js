var stationView;
var stationArray = [];
var markerTest = [];
//var filterItem;


//	$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
//			filterItem = suggestion;
//			console.log(suggestion);
//		});


var ViewModel = function() {
	var self = this;
	self.stationList = ko.observableArray([]);
	this.currentStation = ko.observable(this.stationList()[0]);


	this.setStation = function(clickedStation) {
		self.currentStation(clickedStation);
	};
};




ViewModel();
stationView = new ViewModel;

// wait for DOM to load.
document.addEventListener("DOMContentLoaded", function(event) {
	ko.applyBindings(stationView);
});


//trying to put the visibility and filter functions/observables in the stationView space (global)
var thisLocation = stationView.stationList;
stationView.isVisible = ko.observable(true);
stationView.filterText = ko.observable("");
stationView.filteredItems = ko.computed(function() {
	var filter = stationView.filterText().toLowerCase();
	if (!filter) {
		return stationView.stationList();
	} else {
		return ko.utils.arrayFilter(stationView.stationList(), function(station) {
			var st = station.name.toLowerCase();
			if (st.search(filter) >= 0) {
//				this.isVisible(true);
//				this.marker.visible = true;
			} else {
//				this.isVisible(false);
//				this.marker.visible = false;
			}
		});
	}
}, ViewModel);

//
//
//	FLICKR API START
//
//



var flickrData = function() {
	var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=935807b47b54803dfdbf505814f780de&text='+ this.stationList. +'&format=json&nojsoncallback=1&auth_token=72157663471240722-6ace5f62ac8e56b6&api_sig=40abb51ebfa85eff62bbf0fafd427d68';
	$.getJSON(flickrAPI).success(
		function(data) {
			console.log('yessss');
			console.log("TODO: locations name in flickr API call");
			console.log("TODO: take results (farmid, secret, etc.) and put it in infowindow URL for image");
			console.log("TODO: fix filter (scoping issue?)");
			console.log(data);
		}).fail(
		function(e) {
			console.log('nooooo...%o', e);
		});

	console.log('sent');
};

flickrData();

