import '@logseq/libs'
import '../../leaflet/leaflet.css'

import { LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet'

import {
  getLocationsFromPage,
  LocationProps,
} from '../utils/get-locations-from-page'

const SetViewOnClick = () => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })
  return null
}

const FitBounds = ({ locations }: { locations: LocationProps[] }) => {
  const map = useMap()
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map((location) => location.coords)
      map.fitBounds(bounds)
    }
  }, [map, locations])
  return null
}

const Map = ({
  centrePosition,
  uuid,
  locationsFromPage,
}: {
  centrePosition: LatLngTuple
  uuid: string
  locationsFromPage: LocationProps[]
}) => {
  const [ready, setReady] = useState(false)
  const [locations, setLocations] = useState<LocationProps[]>(locationsFromPage)
  const host = logseq.Experiments.ensureHostScope()

  useEffect(() => {
    if (host.L) {
      return setReady(true)
    }
    let timer: any
    const loadLeaflet = async () => {
      await logseq.Experiments.loadScripts('./leaflet/leaflet.js')
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

  const refreshMap = async () => {
    const locationsFromPage = await getLocationsFromPage(uuid)
    if (!locationsFromPage) return
    setLocations(locationsFromPage)
  }

  return (
    <>
      <MapContainer
        center={centrePosition}
        zoom={logseq.settings?.defaultZoom}
        scrollWheelZoom={false}
        dragging={true}
        tap={true}
        style={{ height: '400px', width: '83vh', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coords}>
            <Popup>{location.description}</Popup>
          </Marker>
        ))}
        <SetViewOnClick />
        <FitBounds locations={locations} />
      </MapContainer>
      <div className="map-control">
        <button className="map-refresh-btn" onClick={refreshMap}>
          <i className="ti ti-refresh"></i>
        </button>
        <button className="map-refresh-btn" onClick={refreshMap}>
          <i className="ti ti-map-pin"></i>
        </button>
      </div>
    </>
  )
}

export default Map
