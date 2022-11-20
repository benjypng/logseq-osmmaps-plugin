import { LatLngTuple } from "leaflet";
import axios from "axios";
import renderLeaflet from "./renderLeaflet";

export default async function getCoordsWithRoutes(
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
  if (var1 && var2) {
    const responseVar1 = await axios({
      method: "get",
      url: `   https://nominatim.openstreetmap.org/`,
      params: {
        q: var1,
        format: "json",
        limit: 1,
      },
    });

    const responseVar2 = await axios({
      method: "get",
      url: `   https://nominatim.openstreetmap.org/`,
      params: {
        q: var2,
        format: "json",
        limit: 1,
      },
    });

    const coords: LatLngTuple[] = [
      [
        parseFloat(responseVar1.data[0].lat),
        parseFloat(responseVar1.data[0].lon),
      ],
      [
        parseFloat(responseVar2.data[0].lat),
        parseFloat(responseVar2.data[0].lon),
      ],
    ];

    renderLeaflet(id, mapType, coords);
  } else if (var1 && var2 && var3 && var4) {
    // Coords
    const coords: LatLngTuple[] = [
      [parseFloat(var1), parseFloat(var2)],
      [parseFloat(var3), parseFloat(var4)],
    ];

    renderLeaflet(id, mapType, coords);
  } else {
    logseq.UI.showMsg(
      "Please ensure that you either enter a location or a set of coordinates",
      "error"
    );
  }
}
