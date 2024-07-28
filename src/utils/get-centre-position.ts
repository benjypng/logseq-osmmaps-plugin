import axios from 'axios'
import { LatLngTuple } from 'leaflet'

export const getCentrePosition = async (
  var1: string,
  var2: string | undefined,
): Promise<LatLngTuple> => {
  if (!var2) {
    const response = await axios({
      method: 'get',
      url: `   https://nominatim.openstreetmap.org/`,
      params: {
        q: var1,
        format: 'json',
        limit: 1,
      },
    })

    return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)]
  } else {
    return [parseFloat(var1), parseFloat(var2)]
  }
}
