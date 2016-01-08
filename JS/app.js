var stationView;
var stationArray = [];

var ViewModel = function() {
	var self = this;

	self.stationList = ko.observableArray();

};


ViewModel();
stationView = new ViewModel;

// wait for DOM to load.
document.addEventListener("DOMContentLoaded", function(event) {
	ko.applyBindings(stationView);
});


// typeahead function for matching string
var substringMatcher = function(strs) {
	return function findMatches(q, cb) {
		var matches, substringRegex;

		// an array that will be populated with substring matches
		matches = [];

		// regex used to determine if a string contains the substring `q`
		substrRegex = new RegExp(q, 'i');

		// iterate through the pool of strings and for any string that
		// contains the substring `q`, add it to the `matches` array
		$.each(strs, function(i, str) {
			if (substrRegex.test(str)) {
				matches.push(str);
			}
		});

		cb(matches);
	};
};

$('.typeahead').typeahead({
	hint: true,
	highlight: true,
	minLength: 2
}, {
	name: 'stationArray',
	source: substringMatcher(stationArray),
	limit: 5
});



/*    
 
 *** *** COMPLETE THE BINDING FUNCTION FOR THE ARRAY FILTER *** ***
 
 
 */


ViewModel.filteredItems = ko.computed(function() {

$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
	console.log(suggestion);

	var st = stationView.stationList;
    if (!suggestion) {
        return st;
    } else {
        return ko.utils.arrayFilter(st.name, function(station) {
        	return st.name === suggestion;
        });
    }
	
});

}, ViewModel);