import { TileLayer } from 'react-leaflet'

const SelectedTileLayer = ({ mapOption }: { mapOption: string }) => {
  switch (mapOption) {
    case 'cycling':
      return (
        <TileLayer
          attribution='&copy; <a href="https://www.thunderforest.com">ThunderForest</a>'
          url={`https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${
            logseq.settings!.thunderForestApi
          }`}
        />
      )
    case 'hiking':
      return (
        <TileLayer
          attribution='&copy; <a href="https://www.thunderforest.com/">ThunderForest</a> contributors'
          url={`https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${
            logseq.settings!.thunderForestApi
          }`}
        />
      )
    default:
      return (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      )
  }
}

export default SelectedTileLayer
