const projects = [
  {
    name: "Model Viewer only",
    id: "1",
    url: "./01_App_viewer_ifc/index.html",
  },
  {
    name: "Annotations",
    id: "2",
    url: "./02_App_annotations/index.html",
  },
  {
    name: "Properties",
    id: "3",
    url: "./03_App_properties/index.html",
  },
  {
    name: "Tree ifc schema",
    id: "4",
    url: "./04_App_tree/index.html",
  },
  {
    name: "Model editing",
    id: "5",
    url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/05/",
  },
  {
    name: "Floor Plans",
    id: "1",
    url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/01/",
  },
  {
    name: "Model annotation",
    id: "2",
    url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/02/",
  },
  // {
  //   name: "Scan 3D Viewer",
  //   id: "3",
  //   url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/03/",
  // },
  // {
  //   name: "Model 4",
  //   id: "4",
  //   url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/04/",
  // },
  // {
  //   name: "Model 5",
  //   id: "5",
  //   url: "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/05/",
  // },
];

/*Start code from ifc.js crash course*/

// Get all cards
const projectContainer = document.getElementById("projects-container");
const projectCards = Array.from(projectContainer.children);
console.log(projectCards);

const templateProjectCard = projectCards[0];

const baseURL = "./model-viewer.html";

for (let project of projects) {
  // Create a new card
  const newCard = templateProjectCard.cloneNode(true);

  // Add project name to card
  const cardTitle = newCard.querySelector("h2");
  cardTitle.textContent = project.name;

  // Add project URL to card
  const button = newCard.querySelector("a");
  button.href = baseURL + `?id=${project.id}`;

  // Add card to container
  projectContainer.appendChild(newCard);
}

templateProjectCard.remove();

/*End code from ifc.js crash course*/

/***** Mouse effect ********/
const mouses = document.querySelectorAll(".mouse");

window.addEventListener("mousemove", (e) => {
  mouses.forEach((mouse) => {
    mouse.style.top = e.y + "px";
    mouse.style.left = e.x + "px";
  });
});

// window.addEventListener("mousemove", (e) => {
//   cursor.style.top = e.y + "px";
//   cursor.style.left = e.x + "px";

//   mouse1.style.top = e.y + "px";
//   mouse1.style.left = e.x + "px";

//   mouse2.style.top = e.y + "px";
//   mouse2.style.left = e.x + "px";
// })
