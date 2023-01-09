import "@logseq/libs";
import generateUniqueId from "./utils/uniqueId";
import callSettings from "./utils/callSettings";
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

  // Add Leaflet JS
  addElement("script", "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js");
  addElement(
    "script",
    "https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"
  );

  logseq.Editor.registerSlashCommand("add map", async () => {
    const id = generateUniqueId();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${id}, default, Singapore}} [:div {:is "map-${id}"}]`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ payload, slot }) => {
    const [type, mapType, var1, var2] = payload.arguments;
    const uuid = payload.uuid;
    if (!type.startsWith(":map_")) return;
    const id = type.split("_")[1]?.trim();

    if (type.startsWith(":map_")) {
      getMapCentrePoint(slot, uuid, id, mapType, var1, var2);
    }
  });
}

logseq.ready(main).catch(console.error);
