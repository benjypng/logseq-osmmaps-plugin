import { Map } from "leaflet";

export default function cyclingMap(map: Map) {
  // @ts-expect-error
  top?.L.tileLayer(
    `https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${
      logseq.settings!.thunderForestApi
    }`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
}
