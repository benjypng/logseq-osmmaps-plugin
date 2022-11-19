import { LatLngTuple } from "leaflet";
import addElement from "./addElementToDom";

export default function renderLeaflet(
  id: string,
  mapType: string,
  coords: LatLngTuple | LatLngTuple[]
) {
  //@ts-expect-error
  const HTMLDivEl = top?.HTMLDivElement;

  class LeafletMap extends HTMLDivEl {
    constructor() {
      super();
      // Set height and position of map
      this.style.position = "relative";
      this.style.height = "500px";
    }

    static get observedAttributes() {
      return ["data-uuid"];
    }

    async connectedCallback() {
      // Set event listener to prevent clickthrough on map
      this.addEventListener("mousedown", function (e: any) {
        e.stopPropogation();
        e.preventDefault();
      });

      this.render();
    }

    render() {
      //@ts-expect-error
      const map = top?.L.map(this).setView(coords, logseq.settings.defaultZoom);

      //@ts-expect-error
      top?.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(map);

      //@ts-expect-error
      top?.L.marker(coords).addTo(map);
    }
  }

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

  //@ts-expect-error
  top?.customElements.define(`map-${id}`, LeafletMap, {
    extends: "div",
  });
}
