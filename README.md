[:gift_heart: Sponsor this project on Github](https://github.com/sponsors/benjypng) or [:coffee: Get me a coffee](https://www.buymeacoffee.com/hkgnp.dev) if you like this plugin!

# Overview

This plugin looks for coordinates or Google Maps links on your page and plots them as markers on a map. You may use it to journal an event, or record down something memorable that happened there.

![](/screenshots/demo.gif)

# Usage

## Step 1

Configure your default zoom level and default location in the plugin settings. This will apply to all future maps.

## Step 2

Start by using the slash command `/Add map`. Make the desired changes to the renderer. For example, in `{{renderer :map_66a602dc-12bc-4abe-8fe0-36e776438fb5, 10, Singapore}}`, the zoom level is 10 and the default location is Singapore. Instead of using a single location, you may also use a latlng expression, **split by a pipe (|)**. Any other separation method is not supported.

You may also append a default marker at the end, like in the example below. In this case, you may have multiple maps on a single page, but with different default marker positions. You will then not be relying on the marker coordinates found on blocks within the page, or within queries. The default marker can only be specified using a latlng expression, **split by a pipe(|)**.
```
{{renderer :map_66caccd5-871a-4e33-b737-785119dcbb60, 10, 1.3138° N | 103.8159° E, 1.3586° N | 103.9899° E}}
```

*TLDR: This plugin assumes that there will only be one map per page when it comes to collecting markers. E.g. You can have multiple maps per page, but they need to be defined in the renderer, and not as blocks. If you want to define them as blocks, then there should only be one map on the page.*

## Step 3

To start creating markers, you may choose any of the below options. They can work together on the same map.

### Using blocks

Ensure that the block has a property `coords`. `coords` can be either in the form of simplified or transitional latitude and longitude, or a Google Maps link.

```
Jurong Bird Park
coords:: 1.3187° N, 103.7064° E

Jurong Bird Park
coords:: 1.3187, 103.7064

Jurong Bird Park
coords:: https://www.google.com/maps/place/Jurong+Bird+Park/@1.3190699,103.7043014,17z
```

### Using Queries

You can also use queries to create markers. Simply add in the following query in a page containing the map:

```
{{query (property :coords)}}
```

You may add other query parameters, but it is important that you include `(property :coords)`.

### Right-clicking on map

When right-clicking on the map, you can automatically create a marker, and a new block will be inserted on the page with the coordinates you just created.

## Changing colours

You may also change colours of your markers by adding in a `marker-color` property. For example:

```
Jurong Bird Park
coords:: 1.3187° N, 103.7064° E
marker-color:: red
```

# API keys

*Mapbox:*

Mapbox API keys are for obtaining the cycling and walking directions. Go to [their website](https://www.mapbox.com/) and sign up for a free account. Create a new access token and note down the generated Access Token somewhere.

*Thunderforest:*

Thunderforest API keys are for providing cycling and hiking maps. Go to [their website](https://www.thunderforest.com/) and sign up for a free account. Upon logging in, your API key is immediately available.

# Installation

Manual installation for now if you cannot find it in the marketplace.

1. Download the latest release.
2. Unzip it to anywhere of your choice.
3. Manually load the plugin from Logseq.

# Credits

- [Open Street Maps](https://www.openstreetmap.org/copyright) for without them, this plugin would not have been possible since mapping is so damn difficult.
- [Leaflet](https://www.leafletjs.com) for their excellent mapping API.
- [Mapbox](https://www.mapbox.com) for their excellent directions system.
- [Thunderforest](https://www.thunderforest.com) for their beautiful cycling and hiking maps. They offer other types of maps too!
