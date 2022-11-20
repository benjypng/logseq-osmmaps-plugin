export default function handleCoordsOrUrl(str: any) {
  if (str.startsWith("https://www.google.com/")) {
    const lat = str.split("@")[1].split(",")[0];
    const lng = str.split("@")[1].split(",")[1].split(",")[0];
    return [lat, lng];
  } else {
    return str
      .replaceAll("\u00B0", "")
      .replaceAll("N", "")
      .replaceAll("E", "")
      .trim()
      .split(",");
  }
}
