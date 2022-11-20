const elemObj = {
  script: {
    ref: "script",
    attribute: "src",
  },
  css: {
    ref: "link",
    attribute: "href",
  },
};

export default function addElement(type: string, url: string) {
  const elem = top?.document.createElement(elemObj[type]["ref"]);
  if (type === "css") {
    elem.setAttribute("rel", "stylesheet");
  }
  elem.setAttribute(elemObj[type]["attribute"], url);
  if (type === "css") {
    top?.document.head.appendChild(elem);
  } else {
    top?.document.body.appendChild(elem);
  }
}
