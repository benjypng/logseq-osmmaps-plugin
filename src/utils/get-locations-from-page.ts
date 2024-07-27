import { LatLngTuple } from 'leaflet'

export interface LocationProps {
  id: string
  description: string
  coords: LatLngTuple
  'marker-color': string
}

export const getLocationsFromPage = async (
  uuid: string,
): Promise<LocationProps[]> => {
  const block = await logseq.Editor.getBlock(uuid)
  if (!block) return []
  const page = await logseq.Editor.getPage(block.page.id)
  if (!page) return []
  const pbt = await logseq.Editor.getPageBlocksTree(page.name)
  return pbt
    .filter((block) => block.properties?.coords)
    .map((block) => {
      const description = block.content.substring(
        0,
        block.content.indexOf('\ncoords::'),
      )
      const coords = block.properties?.coords
        .split(',')
        .map((coord: string) => parseFloat(coord))
      const markerColor = block.properties?.markerColor
      return {
        id: block.uuid,
        description,
        coords,
        'marker-color': markerColor,
      }
    })
}
