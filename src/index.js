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
      `{{renderer :map_${id}, 1.35,103.82}} [:div {:is "map-${id}"}]`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const uuid = payload.uuid;
    const [type, lat, lng] = payload.arguments;
    if (!type.startsWith(':map_')) return;

    const id = type.split('_')[1]?.trim();

    // const coords = [parseFloat(lat), parseFloat(lng)];

    // console.log(coords);

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

    renderMap(id, coords);
    console.log(response.data);

    if (uuid) return;
  });
}

logseq.ready(main).catch(console.error);
