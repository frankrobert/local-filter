STM METRO SYSTEM
===================


Here's the up-to-date version of P5 for Udacity's FEND. This is a map representation of Montreal's STM subway/metro transit system.
----------


Technology
-------------
This project is developed nearly entirely using vanilla javascript, but does utilize both:

 - KnockoutJS
 - jQuery

----------


How-To
-------------------

 1. Download the git repository from 
 http://github.com/officialphrank
 2. Unzip the files locally.
 3. Run the index.html
 4. The map takes approximately 6s to fully load, you'll need to wait until all markers are placed on the map. (You will notice this sets of pins drop on the map, as well as 3 groups of names populating the list on the left-hand side of the app)
 5. Once the map and list are populated, you can click on any list item to filter and single it out. You may also type in the filter box the text for any station you'd like to search for.
 6. Clicking on any map marker or list item will filter and display images of that particular station. 

----------


To-Do
-------------

This project is still a work-in-progress. As it stands, it is fully functional, save for a few elements that need to be worked on:

 - Flickr API call needs to change from authentication tokens to OAuth.
 - Clicking a list item should filter the list and markers *and* open the infowindow.
 - Clicking the marker on the map should filter the list as well.
 - When the infowindow opens, it should display flickr images according to the station name.
 - There should be error handling for the API calls.
 - Add a load / wait-time for the initial 6s it takes for the map to finish placing its pins.
 - Add animation on click.

Special thanks to:
John, Ben, Alex, Abigail, Sarah.