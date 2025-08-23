import { courseFunctions } from "./course/course.js";
import { moduleFunction } from "./module/module.js";

const params = new URLSearchParams(window.location.search);
const courseCode = params.get("code");
const render ={
  addCourseTable(){
    let tableHtml = 
    `
   <div class="modules-container">
      <h2 class="modules-title">Modules</h2>

      <!-- Search bar -->
      <div class="modules-search">
        <input 
          type="text" 
          id="moduleSearch" 
          placeholder="Search module..."
        />
      </div>

      <!-- Table -->
      <div class="modules-table-wrapper">
        <table class="modules-table">
          <thead>
            <tr>
              <th>Module Code</th>
              <th>Module Name</th>
            </tr>
          </thead>
          <tbody id="modulesBody" class="modules-body js-body">
            <tr>
              <td>DPRS20</td>
              <td>Computer Science</td>
            </tr>
            <tr>
              <td>MTH101</td>
              <td>Calculus I</td>
            </tr>
            <tr>
              <td>PHY102</td>
              <td>Physics</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;

    const display = document.querySelector(".modules-display");
    if(!display.querySelector(".modules-container")){
      display.insertAdjacentHTML("beforeend", tableHtml);
    }

    const tableWrapper = document.querySelector(".modules-table-wrapper");
    if (tableWrapper) {
      tableWrapper.scrollIntoView({ behavior: "smooth", block: "start" });

      const searchInput = tableWrapper.querySelector("#moduleSearch");
      if (searchInput) searchInput.focus();
    }

    let typingTimer;
    const search =document.getElementById("moduleSearch");
    search.addEventListener("input", ()=>{
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() =>{
        moduleFunction.findModules(search.value);
      }, 1500);
    });
  },

  removeTable(){
    const module = document.querySelector(".modules-container");
    if(module) module.remove();
  },

  moduleTable(code){
    const renderFirst = () =>{
      return `
        <table class="display" border="0">
            <caption>First Year</caption>
            <thead class="modules-head">
              <tr>
                <th>Code</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody class="modules first-year"></tbody>
          </table>
      `;
    }

    const renderSecond = () =>{
      return `
        <table class="display" border="0">
          <caption>Second Year</caption>
          <thead class="modules-head">
            <tr>
              <th>Code</th>
              <th>Module</th>
            </tr>
          </thead>
          <tbody class="modules second-year"></tbody>
        </table>
      `;
    }

    const renderThird = () =>{
      return `
        <table class="display" border="0">
          <caption>Third Year</caption>
          <thead class="modules-head">
            <tr>
              <th>Code</th>
              <th>Module</th>
            </tr>
          </thead>
          <tbody class="modules third-year"></tbody>
        </table>
      `;
    }

    const renderFourth = () =>{
      return `
        <table class="display" border="0">
            <caption>Fourth Year</caption>
            <thead class="modules-head">
              <tr>
                <th>Code</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody class="modules fourth-year"></tbody>
          </table>
      `;
    }

    const course = code.toLowerCase();
    let content = "";

    if (course.includes("ad") || course.includes("pd")) {
      content = renderFirst();
    } else if (course.includes("dp") && !course.includes("f0")) {
      content = renderFirst() + renderSecond() + renderThird();
    } else if(course.includes("f0")){
      content = renderFirst() + renderSecond() + renderThird() + renderFourth();
    }

    document.querySelector(".tables").innerHTML = content;
  }
};

async function initPage() {
  render.moduleTable(courseCode);
  await courseFunctions.loadCourseInfo();

  document.body.classList.remove("loading");
}

document.addEventListener("DOMContentLoaded", initPage);

document.querySelector(".add-img")
.addEventListener("click", ()=>{
  render.addCourseTable();

  moduleFunction.loadModules(courseFunctions.getCourse(courseCode).modules);
  function handleClickOutside(e) {
    const module = document.querySelector(".modules-container");
    const addImg = document.querySelector(".add-img");
    if(!module.contains(e.target) && e.target !== addImg){
      render.removeTable();
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
});

