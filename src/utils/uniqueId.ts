export default function generateUniqueId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");
}
