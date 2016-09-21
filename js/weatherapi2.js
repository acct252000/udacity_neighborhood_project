/*This file was created by Christine Stoner Udacity Student Septenber 19-20, 2016.  The purpose of this
file is to load weather underground data asynchrously for the map of Dallas inline skates.*/
//This function gets the information from weatherunderground including error handling.
function loadData() {

    //This function sets a timeout to handle if the api call below does not return timely and updates the weather variables on the page accordingly.
    

    model.skates.forEach(function(skate) {

        
                    skate.temperature = "81 f (36c)"
                    skate.windMph = "100";
                    skate.windDir = "SE";
                    skate.relHumid = "80%";
              


    });




    return false;
}

//start the script
loadData();