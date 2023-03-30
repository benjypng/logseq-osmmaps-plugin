import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
import handleCoordsOrUrl from "./handleCoordsOrUrl";

export default async function getAllBlocksWithCoords(uuid: string) {
  const blk = await logseq.Editor.getBlock(uuid);
  let allCoordsBlocksOnPage: any[] = [];

  async function recursiveFind(pbt: BlockEntity[], pageName: string) {
    for (let i = 0; i < pbt.length; i++) {
      // Find blocks with coords property
      if (pbt[i].properties!?.coords) {
        allCoordsBlocksOnPage.push({
          uuid: pbt[i].uuid,
          content: pbt[i].content.split("\ncoords")[0],
          coords: handleCoordsOrUrl(pbt[i].properties!.coords),
          waypoint: pbt[i].properties!.waypoint,
          pageName: pageName,
        });
      }

      // Parse query results
      if (pbt[i].content.startsWith("{{query ")) {
        const tag = pbt[i].content.split("[[")[1].split("]]")[0];
        let queryResult = await logseq.DB.datascriptQuery(`
      			[:find (pull ?b [*])
            :where
            [?b :block/path-refs [:block/name "${tag}"]]
            [?page :block/original-name ?name]]`);
        queryResult = queryResult.filter((b: any) => b[0].content !== "");

        for (let r of queryResult) {
          allCoordsBlocksOnPage.push({
            uuid: r[0].uuid,
            content: r[0].content.split("\ncoords")[0],
            coords: handleCoordsOrUrl(r[0].properties.coords),
            waypoint: r[0].properties.waypoint,
            pageName: pageName,
          });
        }
      }

      if (pbt[i].children) {
        recursiveFind(pbt[i].children as BlockEntity[], pageName);
      } else {
      }
    }
  }

  if (blk) {
    const page = await logseq.Editor.getPage(blk.page.id);
    if (page) {
      const pbt = await logseq.Editor.getPageBlocksTree(page.name);
      await recursiveFind(pbt, page.name);
    }
  }

  return allCoordsBlocksOnPage;
}
