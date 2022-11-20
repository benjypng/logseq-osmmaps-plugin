import { LatLngTuple } from "leaflet";
import axios from "axios";
import renderLeaflet from "./renderLeaflet";

export default async function getCoordsWithoutRoutes(
  id: string,
  mapType: string,
  var1: string,
  var2: string
) {
  const mapElem = top?.document.getElementById(`map-${id}`);
  if (mapElem) {
    mapElem.remove();
  }

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

    renderLeaflet(id, mapType, coords);
  } else if (var1 && var2) {
    // Coords
    const coords: LatLngTuple = [parseFloat(var1), parseFloat(var2)];

    renderLeaflet(id, mapType, coords);
  } else {
    logseq.UI.showMsg(
      "Please ensure that you either enter a location or a set of coordinates",
      "error"
    );
  }
}
