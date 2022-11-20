import { Map } from "leaflet";

export default function defaultMap(map: Map) {
  // @ts-expect-error
  top?.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  top?.document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
}
