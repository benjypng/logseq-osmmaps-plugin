import "@logseq/libs";
import generateUniqueId from "./utils/uniqueId";
import callSettings from "./utils/callSettings";
import getMapCentrePoint from "./getMapCentrePoint";
import addElement from "./utils/addElementToDom";
import { BlockCursorPosition } from "@logseq/libs/dist/LSPlugin.user";
import axios from "axios";

function main() {
  console.log("logseq-maps-plugin loaded");

  callSettings();

  // Add Leaflet CSS
  if (!top!.document.querySelector('script[src*="leaflet"]')) {
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
  }

  logseq.Editor.registerSlashCommand("Add map", async () => {
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

  logseq.Editor.registerSlashCommand(
    "Get coordinates from location",
    async (blk) => {
      const { rect } =
        (await logseq.Editor.getEditingCursorPosition()) as BlockCursorPosition;
      logseq.showMainUI();

      const searchLocation = document.createElement("input");
      searchLocation.style.position = "relative";
      searchLocation.style.top = rect.top + "px";
      searchLocation.style.left = rect.left + "px";
      searchLocation.style.zIndex = "99";
      searchLocation.id = "search-location";
      document.body.appendChild(searchLocation);

      searchLocation.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
          logseq.hideMainUI();
          await logseq.Editor.updateBlock(blk.uuid, searchLocation.value);
          await new Promise((r) => setTimeout(r, 500));
          try {
            const response = await axios({
              method: "get",
              url: `   https://nominatim.openstreetmap.org/`,
              params: {
                q: searchLocation.value,
                format: "json",
                limit: 1,
              },
            });
            await logseq.Editor.upsertBlockProperty(
              blk.uuid,
              "coords",
              `${response.data[0].lat}, ${response.data[0].lon}`
            );
            searchLocation.remove();
            logseq.Editor.exitEditingMode();
          } catch (e) {
            logseq.UI.showMsg("Try a more specific location", "error");
          }
        }
      });
    }
  );

  function handleClosePopup() {
    //ESC
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape") {
          logseq.hideMainUI({ restoreEditingCursor: true });
        } else {
          document.getElementById("search-location")!.focus();
        }

        e.stopPropagation();
      },
      false
    );

    // Click
    document.addEventListener("click", (e) => {
      if (!(e.target as HTMLElement).closest("body")) {
        logseq.hideMainUI({ restoreEditingCursor: true });
      }
    });
  }
  handleClosePopup();
}

logseq.ready(main).catch(console.error);
