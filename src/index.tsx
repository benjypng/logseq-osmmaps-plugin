import '@logseq/libs'

import { createRoot } from 'react-dom/client'

import Map from './components/Map'
import css from './leaflet.css?raw'
import { settings } from './settings'
import { getCentrePosition } from './utils/get-centre-position'
import { getLocationsFromPage } from './utils/get-locations-from-page'

const main = async () => {
  console.log('logseq-osmmaps-plugin loaded')
  logseq.provideStyle(css)

  logseq.Editor.registerSlashCommand('Add map', async (e) => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${e.uuid}, ${logseq.settings?.defaultZoom}, ${logseq.settings?.defaultLocation}}}`,
    )
  })

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const uuid = payload.uuid
    const [type, zoom, defaultLocation, defaultMarker] = payload.arguments
    if (!type || !type.startsWith(':map') || !zoom || !defaultLocation) return

    // Note:
    // defaultMarker is optional
    // defaultLocation is either a place, or latlng separated by a pipe
    const centrePosition = await getCentrePosition(defaultLocation)

    const mapId = `map_${uuid}_${slot}`
    logseq.provideUI({
      key: mapId,
      slot,
      reset: true,
      template: `<div id="${mapId}"></div>`,
    })

    const locationsFromPage = await getLocationsFromPage(uuid)

    setTimeout(() => {
      const el = parent.document.getElementById(mapId)
      if (!el || !el.isConnected) return
      const root = createRoot(el)
      root.render(
        <Map
          zoom={parseFloat(zoom)}
          centrePosition={centrePosition}
          uuid={uuid}
          locationsFromPage={locationsFromPage}
          defaultMarker={defaultMarker}
        />,
      )
    }, 0)
  })
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
