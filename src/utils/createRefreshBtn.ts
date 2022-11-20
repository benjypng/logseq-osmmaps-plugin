export default function createRefreshBtn(id: string, refreshMap: Function) {
  // Add refresh button
  const refreshBtn = top?.document.createElement("div");
  if (refreshBtn) {
    refreshBtn.style.position = "absolute";
    refreshBtn.style.top = "5px";
    refreshBtn.style.right = "5px";
    refreshBtn.style.zIndex = "1001";
    refreshBtn.style.color = "black";
    refreshBtn.innerHTML = `<button style="border:1px solid black;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px">Refresh</button>`;
    refreshBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      refreshMap();
    });
    top?.document.getElementById(`map-${id}`)?.appendChild(refreshBtn);
  }
}
