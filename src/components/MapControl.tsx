import { Marker as LeafletMarker } from 'leaflet'
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react'
import { useForm } from 'react-hook-form'

import {
  getLocationsFromPage,
  LocationProps,
} from '../utils/get-locations-from-page'

export interface MapControlProps {
  setMapOption: Dispatch<SetStateAction<string>>
  markersRef: RefObject<(LeafletMarker | null)[]>
  setLocations: Dispatch<SetStateAction<LocationProps[]>>
  uuid: string
}

const MapControl = ({
  setMapOption,
  markersRef,
  setLocations,
  uuid,
}: MapControlProps) => {
  const { register, watch } = useForm()
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

  const mapOption = watch('mapOption')

  useEffect(() => {
    setMapOption(mapOption)
  }, [mapOption])

  return (
    <div className="map-control">
      <select
        {...register('mapOption')}
        disabled={false}
        className="map-select"
        defaultValue={'default'}
      >
        <option value="default">Default</option>
        <option value="cycling">Cycling</option>
        <option value="hiking">Hiking</option>
      </select>
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
