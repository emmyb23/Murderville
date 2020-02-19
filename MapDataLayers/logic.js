function createMap(Murderville) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 8,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the Murderville layer
  var overlayMaps = {
    "Murders": Murderville
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [36.7783, -119.4179],
    zoom: 12,
    layers: [lightmap, Murderville]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "homicides" property off of response.data
  var homicides = response.data.homicides;

  // Initialize an array to hold murder markers
  var murderMarkers = [];

  // Loop through the homcicides array
  for (var index = 0; index < homicides.length; index++) {
    var homicide = homicides[index];

    // For each homicide, create a marker and bind a popup with the homicides's City and number of murders
    var murderMarker = L.marker([homicide.lat, homicide.lon])
      .bindPopup("<h3>" + homicide.City + "<h3><h3>There have been " + homicide.num_incidents + " murder(s) here!<h3>");

    // Add the marker to the murderMarkers array
    murderMarkers.push(murderMarker);
  }

  // Create a layer group made from the murder markers array, pass it into the createMap function
  createMap(L.layerGroup(murderMarkers));
}


// Perform an API call to the homicide API to get homicide information. Call createMarkers when complete
d3.json("static/js/homicide.json", createMarkers);


