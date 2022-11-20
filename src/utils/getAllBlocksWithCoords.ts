export default async function getAllBlocksWithCoords(uuid: string) {
  const blk = await logseq.Editor.getBlock(uuid);
  if (blk) {
    const page = await logseq.Editor.getPage(blk.page.id);
    if (page) {
      const pbt = await logseq.Editor.getPageBlocksTree(page.name);
      // Filters out blocks with coords
      return pbt
        .filter((b) => b.properties!.coords)
        .map((b) => ({
          uuid: b.uuid,
          content: b.content.split("\ncoords")[0],
          coords: b
            .properties!.coords.replaceAll("°", "")
            .replaceAll("N", "")
            .replaceAll("E", "")
            .trim()
            .split(","),
        }));
    }
  }
}
