import { LatLngTuple } from "leaflet";
import axios from "axios";
import renderLeaflet from "./renderLeaflet";

export default function renderMapWithoutRoutes(id: string) {
  logseq.App.onMacroRendererSlotted(async function ({ payload }) {
    const [type, mapType, var1, var2] = payload.arguments;
    if (!type.startsWith(":map_")) return;

    await logseq.Editor.updateBlock(payload.uuid, `[:div {:is map-${id}}]`);

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
      //logseq.UI.showMsg(
      //  "Please ensure that you either enter a location or a set of coordinates",
      //  "error"
      //);
      console.log("WHY IS THIS APPEARING");
    }
  });
}
