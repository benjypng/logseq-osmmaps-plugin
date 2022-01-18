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
    "defaultZoom": 12
}
```

## Map Routes

1. Type `/add map with routes` on any block.
2. A renderer line will appear that looks something like this: `{{renderer :map-routes_${id}, default, Manchester Airport, Old Trafford}} [:div {:is "map-routes-${id}"}]`.
3. Keep `default` or replace with either of the below (note that if you would like to use the below routes, you will need to get additional API keys from ThunderForest and Mapbox. Instructions for this are in the [below section](https://github.com/hkgnp/logseq-osmmaps-plugin#api-keys)):

- cycling (to get cycling routes)
- hiking (to get hiking routes)

4. Replace `Manchester Airport` and `Old Trafford` with either:

- An address or place
- Latitude and longitude pair

5. Go to the end of the line and hit enter, and a marker will appear on the above designated place.

![](/screenshots/demo2.gif)

```
Examples

By place:
{{renderer :map-routes_rxbtanqd, Manchester Airport, Old Trafford}} [:div {:is "map-routes-rxbtanqd"}]
{{renderer :map-routes_rxbtanqd, 1600 Pennsylvania Avenue NW, 801 Wharf St SW}} [:div {:is "map-routes-rxbtanqd"}]

By latitude and logitude:
{{renderer :map-routes_rxbtanqd, 57.74, 11.94, 57.6792, 11.949}} [:div {:is "map-routes-rxbtanqd"}]
```

### API keys

Mapbox:

Mapbox API keys are for obtaining the cycling and walking directions. Go to [their website](https://www.mapbox.com/) and sign up for a free account. Create a new access token and note down the generated Access Token somewhere.

Thunderforest:

Thunderforest API keys are for providing cycling and hiking maps. Go to [their website](https://www.thunderforest.com/) and sign up for a free account. Upon logging in, your API key is immediately available.

Instructions:

In the settings of the plugin (tiny gear icon), copy and paste the following code and edit in your API keys/tokens accordingly. After saving the file, please ensure that you restart Logeq for the settings to take effect.

```
{
    "thunderForestApi": "1239adkfjksda23412j31kjasd",
    "mapboxApi": "klj123kjasfkjh23j12k4kjsad"
}
```

# Important Notes

Please note the following when using this plugin:

1. If you search by address, please try to be as specific as possible. A general search query will likely not return an accurate result.
2. I have not tested all permutations, so if your search query is obscure, there may be no results.
3. Routing function (directinos and maps) uses your Mapbox and Thunderforest APIs. Excessive usage may exceed the free usage so **please proceed with caution**.

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
- [Mapbox](https://www.mapbox.com) for their excellent directions system.
- [Thunderforest](https://www.thunderforest.com) for their beautiful cycling and hiking maps. They offer other types of maps too!
