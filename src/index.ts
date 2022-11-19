import "@logseq/libs";
import renderMapWithoutRoutes from "./mapWithoutRoutes";
import renderMapWithRoutes from "./mapWithRoutes";
import callSettings from "./utils/callSettings";
import generateUniqueId from "./utils/uniqueId";

function main() {
  console.log("logseq-maps-plugin loaded");

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
