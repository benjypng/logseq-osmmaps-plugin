// Setup Singapore location
const singapore = [1.35, 103.82]; // #1 Singapore latlng
map = L.map('mapid').setView(singapore, 12); // #2 Set the center point
const resetView = () => {
  map.flyTo(singapore, 12, map.getZoom(), {
    animate: true,
    duration: 2,
  });
};

// setup the tile layers
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoiaGtnbnAiLCJhIjoiY2t5ZTB5ZDBjMDl1YzJ1cXB0bmcyNmE2NyJ9.WittfnOlzCRVkv1eQr0IaA',
  }
).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);
