/*
flickr:
Key:
eeed331e9b23f0d61bcc98f32725ce60

Secret:
62bbeb2d816068d4
*/


var flickrData = function() {
	var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=935807b47b54803dfdbf505814f780de&text=Station+Square-Victoria-OACI&format=json&nojsoncallback=1&auth_token=72157663471240722-6ace5f62ac8e56b6&api_sig=40abb51ebfa85eff62bbf0fafd427d68';
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

