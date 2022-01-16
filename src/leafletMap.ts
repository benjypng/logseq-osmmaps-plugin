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

        top?.L.marker(coords).addTo(map);
      }, 500);
    }
  }

  logseq.provideStyle(
    `@import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');`
  );
  if (!top?.customElements.get(NAME)) {
    const script = top?.document.createElement('script');
    script?.setAttribute(
      'src',
      'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
    );
    top?.document.body.appendChild(script);

    top?.customElements.define(NAME, LeafletMap, {
      extends: 'div',
    });
  }
};
