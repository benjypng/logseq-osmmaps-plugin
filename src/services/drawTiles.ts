import { Map } from "leaflet";
import cyclingMap from "./cycling";
import defaultMap from "./default";
import hikingMap from "./hiking";

export default function drawTiles(map: Map, mapType: string) {
  // DEFAULT
  if (mapType === "default") defaultMap(map);

  // HIKING
  if (mapType === "hiking") hikingMap(map);

  // CYCLING
  if (mapType === "cycling") cyclingMap(map);
}
