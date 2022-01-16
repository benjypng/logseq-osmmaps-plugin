import '@logseq/libs';
import 'axios';
import axios from 'axios';
import { renderMap } from './leafletMap';

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

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const uuid = payload.uuid;
    const [type, lat, lng] = payload.arguments;
    if (!type.startsWith(':map_')) return;

    const id = type.split('_')[1]?.trim();

    if (lng) {
      const coords = [parseFloat(lat), parseFloat(lng)];

      console.log(coords);

      renderMap(id, coords);
    } else {
      const response = await axios({
        method: 'get',
        url: `   https://nominatim.openstreetmap.org/`,
        params: {
          q: lat,
          format: 'json',
          limit: 1,
        },
      });

      const coords = [response.data[0].lat, response.data[0].lon];

      console.log(coords);

      renderMap(id, coords);
    }

    if (uuid) return;
  });
}

logseq.ready(main).catch(console.error);
