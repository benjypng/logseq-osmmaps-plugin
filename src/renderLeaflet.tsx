import { LatLngTuple } from "leaflet";
import drawTiles from "./services/drawTiles";
import insertWaypoints from "./services/insertWaypoints";
import createRefreshBtn from "./utils/createRefreshBtn";
import getAllBlocksWithCoords from "./utils/getAllBlocksWithCoords";

declare global {
  interface Window {
    HTMLDivElement: any;
  }
}

export default function renderLeaflet(
  slot: string,
  uuid: string,
  id: string,
  mapType: string,
  coords: LatLngTuple | LatLngTuple[]
) {
  const HTMLDivEl = top?.HTMLDivElement;
  let map: any;

  class LeafletMap extends HTMLDivEl {
    constructor() {
      super();
      // Set height and position of map
      this.style.position = "relative";
      this.style.height = "500px";
      this.style.zIndex = 0;
      this.id = `map-${id}`;
      this.setAttribute("data-slot-id", slot);
    }

    async connectedCallback() {
      // Set event listener to prevent clickthrough on map
      this.addEventListener("mousedown", function (e: any) {
        e.stopPropagation();
        e.preventDefault();
      });

      // Used to refreshMap
      const refreshMap = () => {
        map.remove();
        this.render();
      };
      // Create refresh button
      createRefreshBtn(id, refreshMap);

      // Timeout needed as due to asynchronous loading of map + markers
      window.setTimeout(() => {
        this.render();
      }, 500);
    }

    async render() {
      // Check if first element in array is a string or an array
      // If it is a number, means that it is without routes
      // If it is an array, means that it is with routes
      if (typeof coords[0] === "number") {
        //@ts-expect-error
        map = top?.L.map(this).setView(coords, 12);

        // Draw tiles based on user input in renderer
        drawTiles(map, mapType);

        const allBlocksWithCoords = await getAllBlocksWithCoords(uuid);

        // Add waypoints if they can be found in allBlocksWithCoords
        insertWaypoints(allBlocksWithCoords, map);

        // Create feature group so as to set fitBounds later
        //@ts-expect-error
        const fg = top?.L.featureGroup().addTo(map);

        if (allBlocksWithCoords) {
          for (let i = 0; i < allBlocksWithCoords.length; i++) {
            const coords = allBlocksWithCoords[i].coords;
            const content = allBlocksWithCoords[i].content;

            //@ts-expect-error
            top?.L.marker(coords)
              .addTo(fg)
              .on("click", function () {
                logseq.Editor.scrollToBlockInPage(
                  allBlocksWithCoords[i].pageName,
                  allBlocksWithCoords[i].uuid
                );
              })
              .bindPopup(content);
          }
        }
        // Fitbounds to all created markers
        const bounds = fg.getBounds();
        if (Object.keys(bounds).length !== 0) map.fitBounds(fg.getBounds());
      } else {
        //@ts-expect-error
        map = top?.L.map(this).setView(coords[0], 12);
      }

      // Right click to insert marker
      map.on(
        "contextmenu",
        async function (e) {
          let latlng = map.mouseEventToLatLng(e.originalEvent);

          //@ts-expect-error
          top?.L.marker([parseFloat(latlng.lat), parseFloat(latlng.lng)]).addTo(
            map
          );

          await logseq.Editor.insertBlock(
            uuid,
            `
coords:: ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`,
            { sibling: true, before: false }
          );
        },
        false
      );
    }
  }

  if (!top?.customElements.get(`map-${id}`)) {
    //@ts-expect-error
    top?.customElements.define(`map-${id}`, LeafletMap, {
      extends: "div",
    });
  }
}
