import '@logseq/libs';
import { registerMap } from './leafletMap';

function main() {
  console.log('logseq-maps-plugin loaded');

  // Set up basic scripts and css
  registerMap();

  // Generate unique identifier
  const uniqueIdentifier = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');

  // Insert renderer upon slash command
  logseq.Editor.registerSlashCommand('add map', async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${uniqueIdentifier()}}}`
    );

    const renderBlock = await logseq.Editor.getCurrentBlock();

    await logseq.Editor.insertBlock(
      renderBlock.uuid,
      `[:div {:is "map-div"}]`,
      { before: false, sibling: false }
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const { uuid } = payload;
    const [type] = payload.arguments;

    if (!type.startsWith(':map_')) return;

    const id = type.split('_')[1]?.trim();
    const mapId = `map_${id}`;

    window.setTimeout(() => {
      const renderBaseMap = top?.document.createElement('script');
      renderBaseMap.innerHTML = `
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
          }).addTo(L.map('map-div').setView([51.505, -0.09], 13))`;

      top?.document.body.appendChild(renderBaseMap);
    }, 3000);

    logseq.provideUI({
      key: `${mapId}`,
      slot,
      reset: true,
      template: `<p>Hello World</p>`,
    });
  });
}

logseq.ready(main).catch(console.error);
