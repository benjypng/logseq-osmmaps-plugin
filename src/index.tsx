import '@logseq/libs'

import { createRoot } from 'react-dom/client'

import css from '../leaflet/leaflet.css?raw'
import Map from './components/Map'
import { settings } from './settings'
import { getCentrePosition } from './utils/get-centre-position'
import { getLocationsFromPage } from './utils/get-locations-from-page'

const main = async () => {
  console.log('logseq-osmmaps-plugin loaded')
  logseq.provideStyle(css)

  logseq.Editor.registerSlashCommand('Add map', async (e) => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :map_${e.uuid}, Singapore}}`,
    )
  })

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    const uuid = payload.uuid
    const [type, var1, var2] = payload.arguments
    if (!type || !type.startsWith(':map') || !var1) return

    // If var2 does not exist, search latlng for var1
    // If var1 and var2 exists, take both as the latlng
    const centrePosition = await getCentrePosition(var1, var2)

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
      el.addEventListener('mousedown', (e: any) => {
        e.stopPropagation()
        e.preventDefault()
      })
      const root = createRoot(el)
      root.render(
        <Map
          centrePosition={centrePosition}
          uuid={uuid}
          locationsFromPage={locationsFromPage}
        />,
      )
    }, 0)
  })

  // logseq.Editor.registerSlashCommand('Add map', async () => {
  //   const id = generateUniqueId()
  //   await logseq.Editor.insertAtEditingCursor(
  //     `{{renderer :map_${id}, default, Singapore}} [:div {:is "map-${id}"}]`,
  //   )
  // })

  // logseq.App.onMacroRendererSlotted(async ({ payload, slot }) => {
  //   const [type, mapType, var1, var2] = payload.arguments
  //   const uuid = payload.uuid
  //   if (!type.startsWith(':map_')) return
  //   const id = type.split('_')[1]?.trim()

  //   if (type.startsWith(':map_')) {
  //     getMapCentrePoint(slot, uuid, id, mapType, var1, var2)
  //   }
  // })

  // logseq.Editor.registerSlashCommand(
  //   'Get coordinates from location',
  //   async (blk) => {
  //     const { rect } =
  //       (await logseq.Editor.getEditingCursorPosition()) as BlockCursorPosition
  //     logseq.showMainUI()

  //     const searchLocation = document.createElement('input')
  //     searchLocation.style.position = 'relative'
  //     searchLocation.style.top = rect.top + 'px'
  //     searchLocation.style.left = rect.left + 'px'
  //     searchLocation.style.zIndex = '99'
  //     searchLocation.id = 'search-location'
  //     document.body.appendChild(searchLocation)

  //     searchLocation.addEventListener('keydown', async (e) => {
  //       if (e.key === 'Enter') {
  //         logseq.hideMainUI()
  //         await logseq.Editor.updateBlock(blk.uuid, searchLocation.value)
  //         await new Promise((r) => setTimeout(r, 500))
  //         try {
  //           const response = await axios({
  //             method: 'get',
  //             url: `   https://nominatim.openstreetmap.org/`,
  //             params: {
  //               q: searchLocation.value,
  //               format: 'json',
  //               limit: 1,
  //             },
  //           })
  //           await logseq.Editor.upsertBlockProperty(
  //             blk.uuid,
  //             'coords',
  //             `${response.data[0].lat}, ${response.data[0].lon}`,
  //           )
  //           searchLocation.remove()
  //           logseq.Editor.exitEditingMode()
  //         } catch (e) {
  //           logseq.UI.showMsg('Try a more specific location', 'error')
  //         }
  //       }
  //     })
  //   },
  // )
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
