import "@logseq/libs";
import addElement from "./addElementToDom";
import generateUniqueId from "./utils/uniqueId";
import getCoordsWithoutRoutes from "./getCoordsWithoutRoutes";

function main() {
  console.log("logseq-maps-plugin loaded");

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
      getCoordsWithoutRoutes(id, mapType, var1, var2);
    }
  });
}

logseq.ready(main).catch(console.error);
