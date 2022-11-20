import "@logseq/libs";
import generateUniqueId from "./utils/uniqueId";
import callSettings from "./utils/callSettings";
import getCoordsWithRoutes from "./getCoordsWithRoutes";
import getMapCentrePoint from "./getMapCentrePoint";
import addElement from "./utils/addElementToDom";

function main() {
  console.log("logseq-maps-plugin loaded");

  callSettings();

  // Add Leaflet CSS
  addElement("css", "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css");
  addElement(
    "css",
    "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css"
  );

  logseq.Editor.registerSlashCommand("add map", async () => {
    const id = generateUniqueId();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${id}, default, Singapore}} [:div {:is "map-${id}"}]`
    );
  });

  logseq.Editor.registerSlashCommand("add map with routes", async () => {
    const id = generateUniqueId();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map-routes_${id}, default, Manchester Airport, Old Trafford}} [:div {:is "map-routes-${id}"}]`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ payload }) => {
    const [type, mapType, var1, var2, var3, var4] = payload.arguments;
    if (!type.startsWith(":map_") && !type.startsWith(":map-routes_")) return;
    const id = type.split("_")[1]?.trim();

    if (type.startsWith(":map_")) {
      getMapCentrePoint(id, mapType, var1, var2);
    } else if (type.startsWith("Lmap-routes_")) {
      getCoordsWithRoutes(id, mapType, var1, var2);
    }
  });
}

logseq.ready(main).catch(console.error);
