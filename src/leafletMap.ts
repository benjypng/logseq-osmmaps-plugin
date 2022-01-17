import { LatLngTuple } from 'leaflet';

declare global {
  interface Window {
    HTMLDivElement: any;
  }
}

export const renderMap = (uniqueIdentifier: string, coords: LatLngTuple) => {
  const HTMLDivEl: typeof HTMLDivElement = top?.HTMLDivElement;

  const NAME = `map-${uniqueIdentifier}`;

  class LeafletMap extends HTMLDivEl {
    constructor() {
      super();
      this.style.position = 'relative';
      this.style.height = '500px';
    }

    connectedCallback() {
      window.setTimeout(() => {
        this.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          e.preventDefault();
        });

        // @ts-expect-error
        const map = top?.L.map(this).setView(coords, 12);

        // @ts-expect-error
        top?.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map);

        // @ts-expect-error
        top?.L.marker(coords).addTo(map);

        // @ts-expect-error
        top?.L.Routing.control({
          waypoints: [
            [57.74, 11.94],
            [57.6792, 11.949],
          ],
        }).addTo(map);

        map.fitBounds([
          [57.74, 11.94],
          [57.6792, 11.949],
        ]);
      }, 500);
    }
  }

  logseq.provideStyle(
    `@import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');`
  );
  logseq.provideStyle(
    `@import url('https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css')`
  );

  if (!top?.customElements.get(NAME)) {
    // Add leafletjs
    const script = top?.document.createElement('script');
    script?.setAttribute(
      'src',
      'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
    );
    top?.document.body.appendChild(script);

    // Add leaflet routing machine
    const script2 = top?.document.createElement('script');
    script2?.setAttribute(
      'src',
      'https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js'
    );
    top?.document.body.appendChild(script2);

    top?.customElements.define(NAME, LeafletMap, {
      extends: 'div',
    });
  }
};
