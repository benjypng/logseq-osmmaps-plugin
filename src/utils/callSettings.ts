import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

export default function callSettings() {
  const settings: SettingSchemaDesc[] = [
    {
      key: "defaultZoom",
      type: "number",
      title: "Default Zoom",
      description: "Sets default zoom level for maps",
      default: 12,
    },
    {
      key: "thunderForestApi",
      type: "string",
      title: "ThunderForest API",
      description:
        "Key in your ThunderForest API for cycling and hiking maps. Go to www.thunderforest.com to obtain your access token.",
      default: "12345567891AbsbdA",
    },
    {
      key: "bingApi",
      type: "string",
      title: "Bing Maps API",
      description:
        "Key in your Bing Maps API for a different tile layer. Go to www.bingmapsportal.com to get your access token.",
      default: "12345dskjhfjk09283",
    },
    {
      key: "tileLayer",
      type: "enum",
      enumPicker: "select",
      enumChoices: ["OSM", "Bing Maps"],
      title: "Tile Layer",
      description:
        "If you have indicated a Bing Map API, you have the option of choosing it instead of the default Open Street Maps option.",
      default: "OSM",
    },
    {
      key: "mapboxApi",
      type: "string",
      title: "Mapbox API",
      description:
        "Key in your Mapbox API for cycling and walking directions. Go to www.mapbox.com to obtain your access token.",
      default: "12345567891AbsbdA",
    },
  ];

  logseq.useSettingsSchema(settings);
}
