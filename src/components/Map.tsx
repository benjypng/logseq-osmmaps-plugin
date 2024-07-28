import '@logseq/libs'
import '../../leaflet/leaflet.css'

import { LatLngTuple, Marker as LeafletMarker } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup } from 'react-leaflet'

import { LocationProps } from '../utils/get-locations-from-page'
import { svgIcon } from '../utils/handle-icon'
import { FitBounds } from './map-handlers/fit-bounds'
import { RightClickAddMarker } from './map-handlers/right-click-add-marker'
import { SetViewOnClick } from './map-handlers/set-view-on-click'
import MapControl from './MapControl'
import RoutingControl from './RoutingControl'
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
      </MapContainer>
      <MapControl
        setMapOption={setMapOption}
        markersRef={markersRef}
        setLocations={setLocations}
        uuid={uuid}
      />
    </>
  )
}

export default Map
