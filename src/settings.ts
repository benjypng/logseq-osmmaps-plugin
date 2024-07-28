import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'defaultZoom',
    type: 'number',
    title: 'Default Zoom',
    description: 'Sets default zoom level for new maps.',
    default: 10,
  },
  {
    key: 'defaultLocation',
    type: 'string',
    title: 'Default Location (Place or LatLng)',
    description:
      'Sets default start location for new maps. Can either be a place (e.g. Singapore) or latitude/longitude separated by a comma (e.g. 51.5055, -0.1379)',
    default: 'Singapore',
  },
  {
    key: 'thunderForestApi',
    type: 'string',
    title: 'ThunderForest API',
    description:
      'Key in your ThunderForest API for cycling and hiking maps. Go to www.thunderforest.com to obtain your access token.',
    default: '12345567891AbsbdA',
  },
  {
    key: 'mapboxApi',
    type: 'string',
    title: 'Mapbox API',
    description:
      'Key in your Mapbox API for cycling and walking directions. Go to www.mapbox.com to obtain your access token.',
    default: '12345567891AbsbdA',
  },
]
