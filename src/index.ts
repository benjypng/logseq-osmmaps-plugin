import "@logseq/libs";
import addElement from "./addElementToDom";
import renderMapWithoutRoutes from "./mapWithoutRoutes";
import renderMapWithRoutes from "./mapWithRoutes";
import callSettings from "./utils/callSettings";
import generateUniqueId from "./utils/uniqueId";

function main() {
  console.log("logseq-maps-plugin loaded");

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
  // Call settings page
  callSettings();

  logseq.Editor.registerSlashCommand("Add map", async function () {
    const id = generateUniqueId();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${id}, default, Singapore}} [:div {:is map-${id}}]`
    );

    renderMapWithoutRoutes(id);
  });

  logseq.Editor.registerSlashCommand("Add map with routes", async function () {
    const id = generateUniqueId();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map-routes_${id}, default, Manchester Airport, Old Trafford}}`
    );
    renderMapWithRoutes(id);
  });
}

logseq.ready(main).catch(console.error);
