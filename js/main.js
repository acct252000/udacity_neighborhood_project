/*This file was created by Christine Stoner Udacity Student Septenber 19-20, 2016. This file supports a
website that shows five skating trails in the Dallas area along with weather information pulled from
weater underground through a separate js file, weatherpi.js.*/
//model section lists variables and skate information
var model = {

    "infoWindow": null,
    "mapCoordinates": {
        center: {
            lat: 32.947205,
            lng: -96.821501
        },
        zoom: 11
    },

    "skates": [

        {
            "location": {
                "lat": 32.8806329,
                "lng": -96.9312469
            },
            "trailName": "Campion Trail",
            "parkingSpot": "Birds' Fort Trail Park",
            "length": 14,
            "marker": null,
            "pws": "KTXIRVIN7",
            "temperature": null,
            "windMph": null,
            "windDir": null,
            "relHumid": null

  },
        {
            "location": {
                "lat": 33.0574412,
                "lng": -96.6762328
            },
            "trailName": "Oak Point Trail",
            "parkingSpot": "Oak Point Nature Center",
            "length": 9,
            "marker": null,
            "pws": "KTXPLANO203",
            "temperature": null,
            "windMph": null,
            "windDir": null,
            "relHumid": null

  },
        {
            "location": {
                "lat": 33.0223932,
                "lng": -96.7139285
            },
            "trailName": "Chisholm Trail",
            "parkingSpot": "Plano Senior Center",
            "length": 7,
            "marker": null,
            "pws": "KTXRICHA43",
            "temperature": null,
            "windMph": null,
            "windDir": null,
            "relHumid": null
  },
        {
            "location": {
                "lat": 32.9256216,
                "lng": -96.786438
            },
            "trailName": "White Rock Trail",
            "parkingSpot": "Valley View Park",
            "length": 14,
            "marker": null,
            "pws": "KTXDALLA304",
            "temperature": null,
            "windMph": null,
            "windDir": null,
            "relHumid": null
  },
        {
            "location": {
                "lat": 32.9972092,
                "lng": -96.7344246
            },
            "trailName": "Renner Trail",
            "parkingSpot": "Custer Park",
            "length": 5,
            "marker": null,
            "pws": "KTXRICHA54",
            "temperature": null,
            "windMph": null,
            "windDir": null,
            "relHumid": null
  }

  ]
};

var weatherAttribString;
var shouldShowLogo;

//viewModel section using knockoutjs
var ViewModel = function() {

    var self = this;

    //establish observable array for list of skates and observables for other variables  
    this.skateList = ko.observableArray([]);
    this.minMiles = ko.observable(0);
    this.maxMiles = ko.observable(1000);
    this.formValidation = ko.observable('');
    weatherAttribString = ko.observable("Weather information provided by:");
    shouldShowLogo = ko.observable(true);
    //add all skates to initial skatelist.
    model.skates.forEach(function(skate) {
        self.skateList.push(skate);

    });
    //animate marker and show infoWindow when the list is clicked, passing in the skate clicked.
    self.clickSkate = function(skate) {

        view.animateMarker(skate.marker);
        view.showInfoWindow(skate.marker, model.infoWindow);
    };

    /*validate form input and filter skates by minimum and maximum miles input, passing in input from website
    for minimum and maximum miles*/
    self.filterResults = function() {
        var minNo = Number(this.minMiles());
        var maxNo = Number(this.maxMiles());
        if (isNaN(minNo) || isNaN(maxNo) || minNo < 0 || maxNo < 0) {
            this.formValidation('Please enter positive numbers in the input fields');
            return;

        }
        if (maxNo < minNo) {
            this.formValidation('Please enter a maximum number higher than a minimum');
            return;
        }
        this.formValidation('');
        self.skateList.removeAll();
        model.skates.forEach(function(skate) {
            if (skate.length >= minNo && skate.length <= maxNo) {
                skate.marker.setMap(map);
                self.skateList.push(skate);
            } else {
                skate.marker.setMap(null);
            }
        });
    };
    //remove filter and add all skates back to map, called form remove filter button
    self.unFilterResults = function() {
        this.formValidation('');
        self.skateList.removeAll();
        model.skates.forEach(function(skate) {
            skate.marker.setMap(map);
            self.skateList.push(skate);
        });
    };
    //show navigation menu
    self.showMenu = function() {
        view.showNavBar();
    };
    //hide navigation menu
    self.hideMenu = function() {
        view.hideNavBar();
    };


};

var map;




//set Timeout function to return error message if google is not available
var mapsTimeout = setTimeout(function() {
    if (!window.google || !window.google.maps) {
        var element = document.getElementById('map');
        element.innerHTML = 'So sorry, the map did not load. Please refresh to try again.  Peace, skate, love my brother or sister.';
    }
}, 5000);

/*initialize google map passing in map coordinates from model and set markers based on information
in model.skates*/
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), model.mapCoordinates);
    var markers = [];
    model.infoWindow = new google.maps.InfoWindow();
    model.skates.forEach(function(skate) {
        var marker = new google.maps.Marker({
            position: skate.location,
            title: skate.trailName,
            map: map
        });

        marker.addListener('click', function() {
            view.animateMarker(this);
            view.showInfoWindow(this, model.infoWindow);


        });



        marker.setAnimation(null);

        markers.push(marker);
        skate.marker = marker;
    });
    clearTimeout(mapsTimeout);

}

//intialize with knockout
ko.applyBindings(new ViewModel());


//view section 
var view = {
    //animateMarker with marker input to toggle between bouncing and null   
    animateMarker: function(marker) {

        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }


    },
    //shows the NavBar, called when hamburger icon is clicked.
    showNavBar: function() {

        var element = document.getElementById("navbar");
        element.style.display = 'flex';
        element.style.width = '25%';
        var mainElement = document.getElementById('main');
        mainElement.style.width = '75%';
        var arrowElement = document.getElementById('hidemenuarrow');
        arrowElement.style.display = 'flex';
        var hamburgerElement = document.getElementById('hamburger');
        hamburgerElement.style.display = 'none';


    },
    //hides the NavBar, called when arrow on navbar is clicked
    hideNavBar: function() {

        var element = document.getElementById("navbar");
        element.style.display = 'none';
        element.style.width = '10%';
        var mainElement = document.getElementById('main');
        mainElement.style.width = '90%';
        var arrowElement = document.getElementById('hidemenuarrow');
        arrowElement.style.display = 'none';
        var hamburgerElement = document.getElementById('hamburger');
        hamburgerElement.style.display = 'flex';


    },
    /*shows the infoWindow based on the passed in marker and infoWindow; called upoon click
    allows for closing the infoWindo when close button is clicked*/
    showInfoWindow: function(marker, infoWindow) {


        var currentTemp;
        var currentWindMph;
        var currentWindDir;
        var currentRelativeHumidity;
        var skateLength;

        model.skates.forEach(function(skate) {

            if (marker == skate.marker) {
                currentTemp = skate.temperature;
                currentWindMph = skate.windMph;
                currentWindDir = skate.windDir;
                currentRelativeHumidity = skate.relHumid;
                skateLength = skate.length;

            }

        });

        var htmlWindowString = view.generateHtmlString(currentTemp, currentWindMph, currentWindDir, currentRelativeHumidity);
        console.log("htmlWS is " + htmlWindowString);

        if (infoWindow.marker != marker) {
            infoWindow.marker = marker;
            //infoWindow.setContent('<h5>' + marker.title + '</h5>');
            infoWindow.setContent('<h5>' + marker.title + '</h5>' + htmlWindowString + 'Skate length is ' + skateLength + ' miles.</p>');
            infoWindow.open(map, marker);

            infoWindow.addListener('closeclick', function() {
                infoWindow.marker = null;

            });
        }




    },

    /*This function takes the current weather information for the marker or list item clicked, which will be null if not populated by apiscripts,
    and generates an html string for those that are not none to be displayed in the infoWindow*/

    generateHtmlString: function(currentTemp, currentWindMph, currentWindDir, currentRelativeHumidity) {

        var currentTempString = '';
        var currentWindMphString = '';
        var currentWindDirString = '';
        var currentRelativeHumidityString = '';
        var htmlString = '<p>';

        if (currentTemp) {
            currentTempString = 'Current temperature is ' + currentTemp + '<br>';
        }
        if (currentWindMph) {
            currentWindMphString = 'Current windspeed is ' + currentWindMph + '<br>';
        }
        if (currentWindDir) {
            currentWindDirString = 'Current wind direction is ' + currentWindDir + '<br>';
        }
        if (currentRelativeHumidity) {
            currentRelativeHumidityString = 'Relative humidity is ' + currentRelativeHumidity + '<br>';
        }

        return htmlString.concat(currentTempString, currentWindMphString, currentWindDirString, currentRelativeHumidityString);


    }



};