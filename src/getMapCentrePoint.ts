import { LatLngTuple } from "leaflet";
import axios from "axios";
import renderLeaflet from "./renderLeaflet";

export default async function getMapCentrePoint(
  slot: string,
  uuid: string,
  id: string,
  mapType: string,
  var1: string,
  var2: string
) {
  // Location
  if (var1 && !var2) {
    const response = await axios({
      method: "get",
      url: `   https://nominatim.openstreetmap.org/`,
      params: {
        q: var1,
        format: "json",
        limit: 1,
      },
    });

    const coords: LatLngTuple = [
      parseFloat(response.data[0].lat),
      parseFloat(response.data[0].lon),
    ];

    renderLeaflet(slot, uuid, id, mapType, coords);
  } else if (var1 && var2) {
    // Coords
    const coords: LatLngTuple = [parseFloat(var1), parseFloat(var2)];

    renderLeaflet(slot, uuid, id, mapType, coords);
  } else {
    logseq.UI.showMsg(
      "Please ensure that you either enter a location or a set of coordinates",
      "error"
    );
  }
}
