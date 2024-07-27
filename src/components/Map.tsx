import '@logseq/libs'
import '../../leaflet/leaflet.css'

import { LatLngTuple } from 'leaflet'
import React, { useEffect } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from 'react-leaflet'

const SetViewOnClick = () => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })
  return null
}

const Map = ({
  centrePosition,
  uuid,
}: {
  centrePosition: LatLngTuple
  uuid: string
}) => {
  const [ready, setReady] = React.useState(false)
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
    const block = await logseq.Editor.getBlock(uuid)
    if (!block) return
    const page = await logseq.Editor.getPage(block.page.id)
    console.log(page)
  }

  return (
    <>
      <MapContainer
        center={centrePosition}
        zoom={13}
        scrollWheelZoom={false}
        dragging={true}
        tap={true}
        style={{ height: '400px', width: '83vh', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={centrePosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetViewOnClick />
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
