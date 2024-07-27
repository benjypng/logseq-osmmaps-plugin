import { Marker as LeafletMarker } from 'leaflet'
import { Dispatch, RefObject, SetStateAction, useCallback } from 'react'

import {
  getLocationsFromPage,
  LocationProps,
} from '../utils/get-locations-from-page'

interface MapControlProps {
  markersRef: RefObject<(LeafletMarker | null)[]>
  setLocations: Dispatch<SetStateAction<LocationProps[]>>
  uuid: string
}

const MapControl = ({ markersRef, setLocations, uuid }: MapControlProps) => {
  const handlePopups = useCallback(() => {
    if (markersRef.current) {
      markersRef.current.forEach((marker) => {
        marker?.togglePopup()
      })
    }
  }, [markersRef])

  const refreshMap = useCallback(async () => {
    const locationsFromPage = await getLocationsFromPage(uuid)
    if (!locationsFromPage) return
    setLocations(locationsFromPage)
  }, [uuid, setLocations])

  return (
    <div className="map-control">
      <button className="map-btn" onClick={handlePopups}>
        <i className="ti ti-letter-case"></i>
      </button>
      <button className="map-btn" onClick={refreshMap}>
        <i className="ti ti-refresh"></i>
      </button>
    </div>
  )
}

export default MapControl
