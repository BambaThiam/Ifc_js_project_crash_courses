import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({
  container,
  backgroundColor: new Color(0xffffff),
});
viewer.grid.setGrid();
viewer.axes.setAxes();

// Input_file
viewer.IFC.setWasmPath("../wasm/");
const input = document.getElementById("file-input");
input.onchange = loadIfc;

async function loadIfc(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const model = await viewer.IFC.loadIfcUrl(url);
  await viewer.shadowDropper.renderShadow(model.modelID);
  viewer.context.renderer.postProduction.active = true;
}

init();
async function init() {
  // await viewer.IFC.setWasmPath('../../../');
  // await viewer.IFC.loadIfcUrl('../../../IFC/01.ifc');

  viewer.dimensions.active = true;
  viewer.dimensions.previewActive = true;

  window.ondblclick = () => {
    viewer.dimensions.create();
  };

  window.onkeydown = (event) => {
    if (event.code === "Delete") {
      viewer.dimensions.delete();
    }
  };
}
// Display / Hide

const fenetre = document.querySelector(".activator");
const fenetre_contain = document.querySelector(".card-all");
const message = document.querySelector(".simple-card");

fenetre_contain.style.display = "none";
message.style.display = "none";

fenetre.addEventListener("click", () => {
  console.log("hello world");

  if (fenetre_contain.style.display === "none") {
    fenetre_contain.style.display = "flex";
    message.style.display = "flex";
  } else {
    fenetre_contain.style.display = "none";
    message.style.display = "none";
  }
});
