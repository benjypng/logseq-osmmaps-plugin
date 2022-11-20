export default function insertWaypoints(allBlocksWithCoords: any[], map: any) {
  const waypointCoords = allBlocksWithCoords.filter((b) => b.waypoint);

  if (waypointCoords.length > 0) {
    waypointCoords.sort((a, b) => a.waypoint - b.waypoint);
    console.log(waypointCoords);
    //@ts-expect-error
    top?.L.Routing.control({
      waypoints: waypointCoords.map((p) => p.coords),
      //@ts-expect-error
      router: top?.L.Routing.mapbox(logseq.settings!.mapboxApi),
    }).addTo(map);
  }
}
