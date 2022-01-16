# Overview

This plugin lets you create a map and plot a marker on a specific spot. A possible use case is to perhaps journal an event that happened somewhere memorable.

# Usage

1. Type `/map` on any block.
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

# Important Notes

Please note the following when using this plugin:

1. If you search by address, please try to be as specific as possible. A general search query will likely not return an accurate result.
2. I have not tested all permutations, so if your search query is obscure, there may be no results.

# Installation

Manual installation for now if you cannot find it in the marketplace.

1. Download the latest release.
2. Unzip it to anywhere of your choice.
3. Manually load the plugin from Logseq.

# Credits

- Darwis for his idea on this implementation approach.
- [Open Street Maps](https://www.openstreetmap.org/copyright)
