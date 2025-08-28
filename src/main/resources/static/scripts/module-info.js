import { moduleFunction } from "./module/module.js";

async function initPage() {
  await moduleFunction.inCourses();

  //document.body.classList.remove("loading");
}

document.addEventListener("DOMContentLoaded", initPage);