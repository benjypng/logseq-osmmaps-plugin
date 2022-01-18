> **IMPORTANT** The routing option is based on OSRM's demo server and therefore should not be abused. If you do so, you may notice that it stops working or works wrongly. Open Street Map has kindly provided these services to the open source community and we should respect them for it, and comply with their rules.

<a href="https://www.buymeacoffee.com/hkgnp.dev" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-violet.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

# Overview

This plugin lets you create a map and plot a marker on a specific spot. A possible use case is to perhaps journal an event that happened somewhere memorable.

# Usage

## Marker on Map

1. Type `/add map` on any block.
2. A renderer line will appear that looks something like this: `{{renderer :map_rxbtanqd, Singapore}} [:div {:is "map-rxbtanqd"}]`.
3. Replace `Singapore` with either:

- An address or place
- Latitude and longitude pair

4. Go to the end of the line and hit enter, and a marker will appear on the above designated place.

![](/screenshots/demo.gif)

```
Examples

By place:
{{renderer :map_rxbtanqd, Singapore}} [:div {:is "map-rxbtanqd"}]
{{renderer :map_rxbtanqd, Shanghai China}} [:div {:is "map-rxbtanqd"}]
{{renderer :map_rxbtanqd, 1600 Pennsylvania Avenue NW}} [:div {:is "map-rxbtanqd"}]

By latitude and logitude:
{{renderer :map_rxbtanqd, 1.3521, 103.8198}} [:div {:is "map-rxbtanqd"}] //Singapore
{{renderer :map_rxbtanqd, 37.77, -122.43}} [:div {:is "map-rxbtanqd"}] //San Francisco
```

### Setting Default Zoom (does not apply to routes function)

In the plugin settings, copy and paste the code below, and just the setting accordingly.

```
{
    defaultZoom: 12
}
```

## Map Routes

1. Type `/add map with routes` on any block.
2. A renderer line will appear that looks something like this: `{{renderer :map-routes_${id}, Manchester Airport, Old Trafford}} [:div {:is "map-routes-${id}"}]`.
3. Replace `Manchester Airport` and `Old Trafford` with either:

- An address or place
- Latitude and longitude pair

4. Go to the end of the line and hit enter, and a marker will appear on the above designated place.

![](/screenshots/demo2.gif)

```
Examples

By place:
{{renderer :map-routes_rxbtanqd, Manchester Airport, Old Trafford}} [:div {:is "map-routes-rxbtanqd"}]
{{renderer :map-routes_rxbtanqd, 1600 Pennsylvania Avenue NW, 801 Wharf St SW}} [:div {:is "map-routes-rxbtanqd"}]

By latitude and logitude:
{{renderer :map-routes_rxbtanqd, 57.74, 11.94, 57.6792, 11.949}} [:div {:is "map-routes-rxbtanqd"}]
```

# Important Notes

Please note the following when using this plugin:

1. If you search by address, please try to be as specific as possible. A general search query will likely not return an accurate result.
2. I have not tested all permutations, so if your search query is obscure, there may be no results.
3. Routing mechanism is based on a demo OSRM server and **SHOULD NOT** be abused. Please do not submit multiple requests for routing within a short period of time.

# Installation

Manual installation for now if you cannot find it in the marketplace.

1. Download the latest release.
2. Unzip it to anywhere of your choice.
3. Manually load the plugin from Logseq.

# Credits

- Darwis for his idea on this implementation approach and his guidance.
- [Open Street Maps](https://www.openstreetmap.org/copyright) for without them, this plugin would not have been possible since mapping is so damn difficult.
- [Leaflet](https://www.leafletjs.com) for their excellent mapping API.
- [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine) for providing the routing mechanism.
