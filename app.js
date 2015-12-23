var appModel = {

	locationModel: [

		// angrignon 
		{
			placeId: 'ChIJ1dO3t-MQyUwRfxroO7oF_Gk'
		},
		// monk
		{
			placeId: 'ChIJnakMhfoQyUwRuLJieS3YZw4'
		},
		// jolicoeur
		{
			placeId: 'ChIJlfO3rvUQyUwRELV-FnFwuB4'
		}
	]
};

var geoResultAddress = [];

var ViewModel = function() {

	this.stationList = ko.observable(geoResultAddress);
	this.stationList2 = ko.observableArray([]);
	geoResultAddress.forEach(function(station){
		stationList2.push(geoResultAddress[station]);
	});

	this.userLocations = ko.observable(appModel.locationModel);
	this.currentStation = ko.observable(this.stationList()[0]);

	console.log('this.currentStation: ' + this.currentStation());
	console.log('this.stationList: ' + this.stationList());
	console.log('geoResultAddress: ' + geoResultAddress);
	console.log('this.stationList2: ' + this.stationList2());
};
ko.applyBindings(new ViewModel());