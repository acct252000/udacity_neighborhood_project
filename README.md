## Inline Skate Trails of Dallas

This web page provides a list of inline skate trails in the Dallas area with available weather information.  

### Installation, or How To Run

Download from the git repo here by clicking on the green Clone or download button on the upper right side and selecting Download Zip.
Unzip the files to your computer making sure to preserve the directory structure with the images, css and js folders as shown on GitHub.
Open index.html in web browser. You can do this by putting the path to the file in the address bar of the web browser (i.e. file:///Users/username/Documents/index.html).  You will need internet access for the map and the weather information to load.


### How to Use

This list can be filtered by minimum and maximum mileage by entering postive, numerical values in the fields indicated and clicking the filter button. The filter can be removed by clicking the "Remove Filter" button.  Clicking on a marker or list item will animate that skate's marker and show the info window.  The info window can be closed by clicking on the x in the info window box.
The info window displays the skate title, skate mileage, and current temperature, wind mph and direction, and relative humidity when weather information is available.  The wind mph displayed is not 100% reliable, use at your own risk.  This was left in as we all know how important
wind speed is, if available, to skaters!


### Known Issues

As mentioned above, at some points the wind speed does not appear accurate (0 or 99999).  This indicator was left in to use at your own risk.

### Attribution

Weather information is provided by [weather underground.](http://www.wunderground.com) ![WULogo](/img/wundergroundlogo_4c.png)

The main structure of the supporting script and html of course is based on the following Udacity courses:

* [Intro to Ajax](https://www.udacity.com/course/intro-to-ajax--ud110)
* [JavaScript Design Patterns](https://www.udacity.com/course/javascript-design-patterns--ud989)
* [Google Maps APIs](https://www.udacity.com/course/google-maps-apis--ud864)

Help was also obtained from the following resources:

* [Udacity form question](https://discussions.udacity.com/t/how-to-load-google-map-asynchronously/37094/8)
* [StackOverflow answer on markers](http://stackoverflow.com/questions/22157001/update-reload-markers-without-reloading-google-map)
* [StackOverflow answer on error handling](http://stackoverflow.com/questions/14687237/google-maps-api-async-loading)

Peace, Skate, Love.