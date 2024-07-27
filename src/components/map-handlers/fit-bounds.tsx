import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { LocationProps } from '../../utils/get-locations-from-page'

export const FitBounds = ({ locations }: { locations: LocationProps[] }) => {
  const map = useMap()
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map((location) => location.coords)
      map.fitBounds(bounds)
    }
  }, [map, locations])
  return null
}
