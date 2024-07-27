import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'defaultZoom',
    type: 'number',
    title: 'Default Zoom',
    description: 'Sets default zoom level for maps',
    default: 12,
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
