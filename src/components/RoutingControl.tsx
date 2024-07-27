import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

import { LocationProps } from '../utils/get-locations-from-page'

const RoutingControl = ({
  host,
  locations,
}: {
  host: any
  locations: LocationProps[]
}) => {
  const map = useMap()
  const waypoints = locations
    .filter((location) => location.waypoint)
    .sort((a, b) => parseFloat(a.waypoint) - parseFloat(b.waypoint))

  useEffect(() => {
    if (!map) return

    const routingControl = host.L.Routing.control({
      waypoints: waypoints.map((location) => location.coords),
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map)

    // return () => map.removeControl(routingControl)
  }, [map, waypoints])

  return null
}

export default RoutingControl
