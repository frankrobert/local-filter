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
		},
		// verdun
		{
			placeId: 'ChIJpxXXt2AQyUwR7IuapljK3-E'
		},
		// de l'eglise
		{
			placeId: 'ChIJ85ZBm2YQyUwRbpt3EAwTR2M'
		},
		// lasalle
		{
			placeId: 'ChIJgwYTPnwQyUwRMWNIlONF49A'
		},
		// charlevoix
		{
			placeId: 'ChIJifVaon8ayUwRkywkhR1agC0'
		},
		// lionel-groulx
		{
			placeId: 'ChIJ8xdUMHcayUwR6M1HNDWRY5g'
		}
	]
};

var testPlace = [];

var geoResultAddress = [];

var ViewModel = function() {
	var self = this;

	var Place = function(data) {
		this.name = data.name;
		this.location = data.location;
	};


	self.stationList = ko.observableArray([]);
	geoResultAddress.forEach(function(placeitem) {
		self.stationList.push(new Place(placeitem));
	});



};
window.onload = function() {
	ko.applyBindings(new ViewModel());
};