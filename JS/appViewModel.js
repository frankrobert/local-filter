// defined in global space the viewmodel object
var stationView;

define(['knockout'], function(ko) {
    return function appViewModel() {

	var self = this;

	var Place = function(data) {
		this.name = data.name;
		this.viscinity = data.viscinity;
	};

	this.stationList = ko.observableArray();

    };
});
/*now in your result callback you should be able to push directly by referencing myViewModel
var ViewModel = function() {
	var self = this;

	var Place = function(data) {
		this.name = data.name;
		this.viscinity = data.viscinity;
	};

	this.stationList = ko.observableArray();

/*	self.stationPush = function() {
		geoResultAddress.forEach(function(placeitem) {
			self.stationList.push(new Place(placeitem));
		});
	};
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
// };

// ko.applyBindings(new ViewModel());

// in your onload function
stationView = new appViewModel();