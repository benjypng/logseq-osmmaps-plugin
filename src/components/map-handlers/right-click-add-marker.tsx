import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMapEvent } from 'react-leaflet'

import {
  getLocationsFromPage,
  LocationProps,
} from '../../utils/get-locations-from-page'

export const RightClickAddMarker = ({
  uuid,
  setLocations,
}: {
  uuid: string
  setLocations: Dispatch<SetStateAction<LocationProps[]>>
}) => {
  const { register, watch, reset } = useForm()
  const [description, setDescription] = useState<boolean>(false)
  const [descriptionPosition, setDescriptionPosition] = useState<number[]>([
    0, 0,
  ])
  const [markerLatLng, setMarkerLatLng] = useState<number[]>([0, 0])

  useMapEvent('contextmenu', async (e) => {
    setDescription(true)
    setDescriptionPosition([e.containerPoint.x, e.containerPoint.y])
    setMarkerLatLng([e.latlng.lat, e.latlng.lng])
  })

  const closeDescription = () => {
    setDescription(false)
    reset()
  }

  const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const data = watch('description')
      const block = await logseq.Editor.getBlock(uuid)
      if (!block) return
      const page = await logseq.Editor.getPage(block.page.id)
      if (!page) return
      await logseq.Editor.appendBlockInPage(
        page.name,
        `${data}
coords:: ${markerLatLng[0]}, ${markerLatLng[1]}`,
      )
      const locationsFromPage = await getLocationsFromPage(uuid)
      if (!locationsFromPage) return
      setLocations(locationsFromPage)
      await logseq.Editor.exitEditingMode()
      reset()
      setDescription(false)
    }
  }

  if (description) {
    return (
      <div
        className="map-input-container"
        style={{
          top: descriptionPosition[1],
          left: descriptionPosition[0],
        }}
      >
        <input
          {...register('description')}
          type="text"
          autoFocus={true}
          className="map-input"
          placeholder="Enter description"
          onKeyDown={handleKeyPress}
        />
        <button onClick={closeDescription}>
          <i
            className="ti ti-x"
            style={{ fontSize: '1rem', marginLeft: '0.5rem' }}
          ></i>
        </button>
      </div>
    )
  }

  return null
}
