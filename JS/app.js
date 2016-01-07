var stationView;
var ViewModel = function() {
	var self = this;

	self.stationList = ko.observableArray();

	var Place = function(data) {
		this.name = data.name;
		this.viscinity = data.viscinity;
	};
};
ViewModel();
stationView = new ViewModel;

// wait for DOM to load.
document.addEventListener("DOMContentLoaded", function(event) { 
ko.applyBindings(stationView);
});