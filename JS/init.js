require(['knockout', 'appViewModel', 'domReady!', 'map', 'mapstyle'], function(ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});