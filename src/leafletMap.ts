import { LatLngTuple } from 'leaflet';

declare global {
  interface Window {
    HTMLDivElement: any;
  }
}

export const renderMap = (
  uniqueIdentifier: string,
  coords: LatLngTuple | [LatLngTuple, LatLngTuple]
) => {
  const HTMLDivEl: typeof HTMLDivElement = top?.HTMLDivElement;

  let NAME: string;
  if (typeof coords[0] === 'number') {
    NAME = `map-${uniqueIdentifier}`;
  } else {
    NAME = `map-routes-${uniqueIdentifier}`;
  }

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

        let map: any;
        if (typeof coords[0] === 'number') {
          // @ts-expect-error
          map = top?.L.map(this).setView(coords, 12);
        } else {
          // @ts-expect-error
          map = top?.L.map(this).setView(coords[0], 12);
        }

        // @ts-expect-error
        top?.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }).addTo(map);

        if (typeof coords[0] === 'number') {
          // @ts-expect-error
          top?.L.marker(coords).addTo(map);
        } else {
          // @ts-expect-error
          top?.L.marker(coords[0]).addTo(map);
        }

        if (typeof coords[0] !== 'number') {
          // @ts-expect-error
          top?.L.Routing.control({
            waypoints: coords,
          }).addTo(map);

          map.fitBounds(coords);
        }
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
