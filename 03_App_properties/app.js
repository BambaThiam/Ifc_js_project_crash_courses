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

// async function loadIfc(url) {
//     await viewer.IFC.setWasmPath("../../../");
//     const model = await viewer.IFC.loadIfcUrl(url);
//     await viewer.shadowDropper.renderShadow(model.modelID);
//     viewer.context.renderer.postProduction.active = true;
// }

// loadIfc('../../../IFC/01.ifc');

// Properties menu

window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();

window.ondblclick = async () => {
  const result = await viewer.IFC.selector.highlightIfcItem();
  if (!result) return;
  const { modelID, id } = result;
  const props = await viewer.IFC.getProperties(modelID, id, true, false);
  createPropertiesMenu(props);
};

const propsGUI = document.getElementById("ifc-property-menu-root");

function createPropertiesMenu(properties) {
  console.log(properties);

  removeAllChildren(propsGUI);

  const psets = properties.psets;
  const mats = properties.mats;
  const type = properties.type;

  delete properties.psets;
  delete properties.mats;
  delete properties.type;

  for (let key in properties) {
    createPropertyEntry(key, properties[key]);
  }
}

function createPropertyEntry(key, value) {
  const propContainer = document.createElement("div");
  propContainer.classList.add("ifc-property-item");

  if (value === null || value === undefined) value = "undefined";
  else if (value.value) value = value.value;

  const keyElement = document.createElement("div");
  keyElement.textContent = key;
  propContainer.appendChild(keyElement);

  const valueElement = document.createElement("div");
  valueElement.classList.add("ifc-property-value");
  valueElement.textContent = value;
  propContainer.appendChild(valueElement);

  propsGUI.appendChild(propContainer);
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Display / Hide

const fenetre = document.querySelector(".activator");
const fenetre_contain = document.querySelector(".card-all");
const message = document.querySelector(".simple-card");

fenetre_contain.style.display = "none";
message.style.display = "none";

fenetre.addEventListener("click", () => {
  // console.log("hello world");

  if (fenetre_contain.style.display === "none") {
    fenetre_contain.style.display = "flex";
    message.style.display = "flex";
  } else {
    fenetre_contain.style.display = "none";
    message.style.display = "none";
  }
});
