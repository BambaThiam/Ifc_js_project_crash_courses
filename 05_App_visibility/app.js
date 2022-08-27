import {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
} from "web-ifc";

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
  model.removeFromParent();
  await viewer.shadowDropper.renderShadow(model.modelID);
  //   viewer.context.renderer.postProduction.active = true;
  // get catégories
  await setupAllCategories();
}

// async function loadIfc(url) {
// 	await viewer.IFC.setWasmPath("../../../");
// 	const model = await viewer.IFC.loadIfcUrl(url);
// 	model.removeFromParent();
// 	await viewer.shadowDropper.renderShadow(model.modelID);

// 	await setupAllCategories();
// }

// loadIfc('../../../IFC/01.ifc');

const scene = viewer.context.getScene();

// List of categories names
const categories = {
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCFURNISHINGELEMENT,
  IFCDOOR,
  IFCWINDOW,
  IFCPLATE,
  IFCMEMBER,
};

// Gets the name of a category
function getName(category) {
  const names = Object.keys(categories);
  return names.find((name) => categories[name] === category);
}

// Gets all the items of a category
async function getAll(category) {
  return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}

// Creates a new subset containing all elements of a category
async function newSubsetOfType(category) {
  const ids = await getAll(category);
  return viewer.IFC.loader.ifcManager.createSubset({
    modelID: 0,
    scene,
    ids,
    removePrevious: true,
    customID: category.toString(),
  });
}

// Stores the created subsets
const subsets = {};

async function setupAllCategories() {
  const allCategories = Object.values(categories);
  for (let i = 0; i < allCategories.length; i++) {
    const category = allCategories[i];
    await setupCategory(category);
  }
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
  subsets[category] = await newSubsetOfType(category);
  setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
  const name = getName(category);
  const checkBox = document.getElementById(name);
  checkBox.addEventListener("change", (event) => {
    const checked = event.target.checked;
    const subset = subsets[category];
    if (checked) scene.add(subset);
    else subset.removeFromParent();
  });
}

// Display / Hide

const fenetre = document.querySelector(".activator");
const fenetre_contain = document.querySelector(".card-all");
const message = document.querySelector(".simple-card");

fenetre_contain.style.display = "none";
message.style.display = "none";

fenetre.addEventListener("click", () => {
  //   console.log("hello world");

  if (fenetre_contain.style.display === "none") {
    fenetre_contain.style.display = "flex";
    message.style.display = "flex";
  } else {
    fenetre_contain.style.display = "none";
    message.style.display = "none";
  }
});
