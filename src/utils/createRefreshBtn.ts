export default function createRefreshBtn(id: string, refreshMap: Function) {
  // Add refresh button
  const refreshBtn = top?.document.createElement("div");
  if (refreshBtn) {
    refreshBtn.style.position = "absolute";
    refreshBtn.style.top = "5px";
    refreshBtn.style.right = "5px";
    refreshBtn.style.zIndex = "1001";
    refreshBtn.innerHTML = `<button>Refresh</button>`;
    refreshBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      refreshMap();
    });
    top?.document.getElementById(`map-${id}`)?.appendChild(refreshBtn);
  }
}
