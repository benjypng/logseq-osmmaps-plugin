import '@logseq/libs';
import 'axios';
import axios from 'axios';
import { renderMap } from './leafletMap';
import { LatLngTuple } from 'leaflet';

function main() {
  console.log('logseq-maps-plugin loaded');

  // Generate unique identifier
  const uniqueIdentifier = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');

  logseq.Editor.registerSlashCommand('add map', async () => {
    const id = uniqueIdentifier();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${id}, Singapore}} [:div {:is "map-${id}"}]`
    );
  });

  logseq.Editor.registerSlashCommand('add map with routes', async () => {
    const id = uniqueIdentifier();
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map-routes_${id}, Manchester Airport, Old Trafford}} [:div {:is "map-routes-${id}"}]`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const [type, var1, var2, var3, var4] = payload.arguments;
    if (!type.startsWith(':map_') && !type.startsWith(':map-routes_')) return;

    const id = type.split('_')[1]?.trim();

    if (type.startsWith(':map-routes_')) {
      if (var1 && var2 && var3 && var4) {
        const routeCoords: [LatLngTuple, LatLngTuple] = [
          [parseFloat(var1), parseFloat(var2)],
          [parseFloat(var3), parseFloat(var4)],
        ];

        console.log(routeCoords);

        renderMap(id, routeCoords);
      } else if (var1 && var2 && !var3 && !var4) {
        // Check if location only
        const response = await axios({
          method: 'get',
          url: `   https://nominatim.openstreetmap.org/`,
          params: {
            q: var1,
            format: 'json',
            limit: 1,
          },
        });

        const response2 = await axios({
          method: 'get',
          url: `   https://nominatim.openstreetmap.org/`,
          params: {
            q: var2,
            format: 'json',
            limit: 1,
          },
        });

        const routeCoords: [LatLngTuple, LatLngTuple] = [
          [response.data[0].lat, response.data[0].lon],
          [response2.data[0].lat, response2.data[0].lon],
        ];

        console.log(routeCoords);

        renderMap(id, routeCoords);
      }
    } else if (type.startsWith(':map_')) {
      if (var1 && var2 && !var3 && !var4) {
        const coords: [number, number] = [parseFloat(var1), parseFloat(var2)];

        console.log(coords);

        renderMap(id, coords);
      } else if (var1 && !var2 && !var3 && !var4) {
        const response = await axios({
          method: 'get',
          url: `   https://nominatim.openstreetmap.org/`,
          params: {
            q: var1,
            format: 'json',
            limit: 1,
          },
        });

        const coords: [number, number] = [
          parseFloat(response.data[0].lat),
          parseFloat(response.data[0].lon),
        ];

        console.log(coords);

        renderMap(id, coords);
      }
    }
  });
}

logseq.ready(main).catch(console.error);
