import '@logseq/libs'
import '../../leaflet/leaflet.css'

import { createControlComponent } from '@react-leaflet/core'
import { LatLngTuple, Marker as LeafletMarker } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'

import { LocationProps } from '../utils/get-locations-from-page'
import { svgIcon } from '../utils/handle-icon'
import { FitBounds } from './map-handlers/fit-bounds'
import { RightClickAddMarker } from './map-handlers/right-click-add-marker'
import { SetViewOnClick } from './map-handlers/set-view-on-click'
import MapControl from './MapControl'
import SelectedTileLayer from './SelectedTileLayer'

const Map = ({
  zoom,
  centrePosition,
  uuid,
  locationsFromPage,
}: {
  zoom: number
  centrePosition: LatLngTuple
  uuid: string
  locationsFromPage: LocationProps[]
}) => {
  const [ready, setReady] = useState(false)
  const [locations, setLocations] = useState<LocationProps[]>(locationsFromPage)
  const [mapOption, setMapOption] = useState<string>('')
  const markersRef = useRef<(LeafletMarker | null)[]>([])

  const host = logseq.Experiments.ensureHostScope()
  useEffect(() => {
    if (host.L) {
      return setReady(true)
    }
    let timer: any
    const loadLeaflet = async () => {
      await logseq.Experiments.loadScripts('./leaflet/leaflet.js')
      await logseq.Experiments.loadScripts(
        './leaflet/leaflet-routing-machine.js',
      )
      timer = setTimeout(async () => {
        setReady(true)
      }, 50)
    }
    loadLeaflet()
    return () => {
      timer && clearTimeout(timer)
    }
  }, [])
  if (!ready) {
    return <strong>Loading Leaflet...</strong>
  }

  const CreateCustomMapControl = (props: any) => {
    const CustomControl = host.L.Control.extend({
      onAdd: function () {
        const container = host.L.DomUtil.create('div', 'custom-control')
        host.L.DomEvent.disableClickPropagation(container)
        host.L.DomEvent.disableScrollPropagation(container)
        const root = createRoot(container)
        root.render(<MapControl {...props} />)
        return container
      },
      onRemove: function () {
        // Cleanup
      },
    })
    return new CustomControl({ position: 'bottomleft' })
  }
  const MapControlComponent = createControlComponent(CreateCustomMapControl)

  return (
    <>
      <MapContainer
        zoom={zoom}
        center={centrePosition}
        scrollWheelZoom={false}
        dragging={true}
        tap={true}
        style={{ height: '400px', width: '83vh', zIndex: 0 }}
      >
        <SelectedTileLayer mapOption={mapOption} />
        {locations.map((location, index) => (
          <Marker
            key={location.id}
            position={location.coords}
            ref={(el) => (markersRef.current[index] = el)}
            icon={svgIcon(host, location['marker-color'])}
          >
            <Popup autoClose={false}>{location.description}</Popup>
          </Marker>
        ))}
        <RightClickAddMarker uuid={uuid} setLocations={setLocations} />
        <FitBounds locations={locations} />
        <SetViewOnClick />
        <MapControlComponent
          setMapOption={setMapOption}
          markersRef={markersRef}
          setLocations={setLocations}
          uuid={uuid}
        />
      </MapContainer>
    </>
  )
}

export default Map
