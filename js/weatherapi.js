/*This file was created by Christine Stoner Udacity Student Septenber 19-20, 2016.  The purpose of this
file is to load weather underground data asynchrously for the map of Dallas inline skates.*/


//This function gets the information from weatherunderground including error handling.

function loadData() {

//This function sets a timeout to handle if the api call below does not return timely and updates the weather variables on the page accordingly.
var weatherRequestTimeout = setTimeout(function(){
   weatherAttribString("No weather information available");
   shouldShowLogo(false);
},8000);

model.skates.forEach(function(skate){

var weatherUrl = 'http://api.wunderground.com/api/43b0d1ce187c81ec/conditions/q/pws:' + skate.pws+'.json';

/*this function calls the api to weatherunderground and parses the temperature, windMph, windDir, and relative Humidity from the response.  If the
temperature string is not as expected, the data items remain null.  Lastly, the timeout called above is cleared if the response is successful.*/

$.ajax({
url: weatherUrl,
dataType: "jsonp",
success: function(response){
var apiResponse = response.current_observation;

//ensure response is in expected format
if(apiResponse.temperature_string.slice(-1) == ')'){
skate.temperature = apiResponse.temperature_string;
skate.windMph = apiResponse.wind_mph;
skate.windDir = apiResponse.wind_dir;
skate.relHumid = apiResponse.relative_humidity;
} else {
weatherAttribString("No weather information available");
    shouldShowLogo(false);

}


//clear the timeout set above
clearTimeout(weatherRequestTimeout);
}
});



});    




   

    return false;
};

//start the script
loadData();
