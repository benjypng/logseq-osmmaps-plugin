import { LatLngTuple } from "leaflet";
import drawTilesWithoutRoutes from "../withoutRoutes";
import createRefreshBtn from "./utils/createRefreshBtn";
import getAllBlocksWithCoords from "./utils/getAllBlocksWithCoords";

export default function renderLeaflet(
  id: string,
  mapType: string,
  coords: LatLngTuple | LatLngTuple[]
) {
  //@ts-expect-error
  const HTMLDivEl = top?.HTMLDivElement;
  let map: any;

  class LeafletMap extends HTMLDivEl {
    constructor() {
      super();
      // Set height and position of map
      this.style.position = "relative";
      this.style.height = "500px";
      this.id = `map-${id}`;
    }

    static get observedAttributes() {
      return ["data-uuid"];
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

      this.render();
    }

    get uuid() {
      return (
        this.getAttribute("data-uuid") ||
        this.closest('div[id^="block-content"]')?.getAttribute("blockid") ||
        ""
      );
    }

    async render() {
      //@ts-expect-error
      map = top?.L.map(this).setView(coords, 12);

      // IF NO ROUTES
      drawTilesWithoutRoutes(map, mapType);

      const allBlocksWithCoords = await getAllBlocksWithCoords(this.uuid);

      // Create feature group so as to set fitBounds later
      //@ts-expect-error
      const fg = top?.L.featureGroup().addTo(map);
      if (allBlocksWithCoords) {
        for (let i = 0; i < allBlocksWithCoords.length; i++) {
          const coords = allBlocksWithCoords[i].coords;
          const content = allBlocksWithCoords[i].content;
          //@ts-expect-error
          top?.L.marker(coords).addTo(fg).bindPopup(content);
        }
      }
      // Fitbounds to all created markers
      map.fitBounds(fg.getBounds());

      // Currently not needed
      //top?.document.addEventListener(
      //  "contextmenu",
      //  function (e) {
      //    e.preventDefault();
      //    e.stopPropagation();
      //  },
      //  false
      //);

      // IF ROUTES
    }
  }

  //@ts-expect-error
  top?.customElements.define(`map-${id}`, LeafletMap, {
    extends: "div",
  });
}
