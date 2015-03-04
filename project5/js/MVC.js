//global var to hold place queried
var destination;
//global var to hold markers of interests to reset
var interestMarkers = [];

var model = {
    initMap: function () {
        //setup a google map at full zoom out
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions = {
                center: {
                    lat: 0,
                    lng: 0
                },
                zoom: 1
            }
        );
        //return the map to be used as a global var
        return map;
    },
    
    addMarker

};

var wantsShops = false;
var wantsFood = false;
var wantsParks = false;

var controller = {
    updateInterests: function () {
        var interestArray = [];
        if (wantsShops == true) {
            interestArray.push('store');
            interestArray.push('shopping_mall');
        }
        if (wantsFood == true) {
            interestArray.push('food');
        }
        if (wantsParks == true) {
            interestArray.push('park');
        }
        console.log("interests of: " + interestArray);
        return interestArray;
    },
    
    
    setNeighborhood: function () {
        //get data from the query box
        var city = $('#city').val();
        var street = $('#street').val();
        var query = city + ", " + street;
        //setup geocoder
        var finder = new google.maps.Geocoder();
        //locate the address user input
        finder.geocode({
            'address': query
        }, function (results, status) {
            //error handling
            if (status != google.maps.GeocoderStatus.OK) {
                alert("Geocode was not successful in finding that location!" + status);
                return;
            } else {
                var location = results[0].geometry.location;
                map.setCenter(location);
                //make marker at desired location
                var marker = new google.maps.Marker({
                    map: map,
                    position: location
                });
                //set a reasonable zoom in and make sure marker is in view
                map.setZoom(12);
                map.panTo(location);
                //pass location to use as global var
                destination = location;
            }
        });
    },

    searchInterests: function () {
        //get user interests to search for
        var interests = controller.updateInterests();
        //set current interest markers' map to null to clear off the map
        for (var i = 0; i < interestMarkers.length; i++) {
            interestMarkers[i].setMap(null);
        }
        interestMarkers = [];
        //clear out html in list to populate with new info
        $(".interest-list-item").remove();

        //request is centered on the location that was queried earlier
        var request = {
            location: destination,
            radius: '5000',
            types: interests
        };
        //make a new search
        var search = new google.maps.places.PlacesService(map);
        console.log(request.types);

        search.nearbySearch(request, function (results, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert("There was a problem looking for anything of interest" + status);
                return;
            } else {
                //handle undefined destination
                if (destination.property !== undefined) {
                    alert("please enter a location to seaarch near first");
                    return;
                }
                //layout markers on the map and add them to an array
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location,
                        placeId: results[0].place_id
                    });

                    interestMarkers.push(marker);

                    var id = {
                        placeId: interestMarkers[interestMarkers.length - 1].placeId
                    }
                    search.getDetails(id, function (results, status) {
                        if (status != google.maps.places.PlacesServiceStatus.OK) {
                            alert("There was a problem looking for anything of interest" + status);
                            return;
                        } else {
                            //handle undefined destination
                            if (destination.property !== undefined) {
                                alert("please enter a location to seaarch near first");
                                return;
                            }

                            model.attachInfo(results[i], i);
                        }
                    });
                }
            }
        });
    },

    /*
    //attach information to display to list and on marker click
                        for (var i = 0; i < results.length; i++) {
                            var info = results[i];
                            model.attachInfo(info, i);
                        }
    */

    attachInfo: function (result, i) {
        //set current marker to give info on
        
        console.log(interestMarkers[i]);
        var currMarker = interestMarkers[i];
        console.log(currMarker);
        
        $("#interest-list").append('<li class="interest-list-item">' + result.place_id + '</li>');

        var info = new google.maps.InfoWindow({
            content: "<p>" + currMarker.getPosition() + "</p>"
        });

        google.maps.event.addDomListener(currMarker, 'click', function () {
            info.open(map, currMarker);
        });

    }
};

var view = {
    render: function () {

    }
};

ko.applyBindings(controller);
//ko.applyBindings(controller);
//ko.applyBindings(view);
var map = model.initMap();