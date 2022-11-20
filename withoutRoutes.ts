import { Map } from "leaflet";
import cyclingMap from "./src/services/cycling";
import defaultMap from "./src/services/default";
import hikingMap from "./src/services/hiking";

export default function drawTilesWithoutRoutes(map: Map, mapType: string) {
  // DEFAULT
  if (mapType === "default") defaultMap(map);

  // HIKING
  if (mapType === "hiking") hikingMap(map);

  // CYCLING
  if (mapType === "cycling") cyclingMap(map);
}
