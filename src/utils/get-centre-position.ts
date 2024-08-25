import axios from 'axios'
import { LatLngTuple } from 'leaflet'

export const getCentrePosition = async (
  defaultLocation: string,
): Promise<LatLngTuple> => {
  // defaultLocation can either be a place, or latlng separated by a pipe
  const checkLatLngOrPlace = defaultLocation.split('|')

  if (checkLatLngOrPlace.length === 1) {
    const response = await axios({
      method: 'get',
      url: `   https://nominatim.openstreetmap.org/`,
      params: {
        q: defaultLocation,
        format: 'json',
        limit: 1,
      },
    })
    return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]
  } else if (checkLatLngOrPlace.length === 2) {
    return [
      parseFloat(checkLatLngOrPlace[0]!),
      parseFloat(checkLatLngOrPlace[1]!),
    ]
  } else {
    return [1.3521, 103.8198]
  }
}
