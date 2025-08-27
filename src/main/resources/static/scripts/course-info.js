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
          autocomplete="off"
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

    render.removeMenu();

    const tableWrapper = document.querySelector(".modules-table-wrapper");
    if (tableWrapper) {
      tableWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let typingTimer;
    const search =document.getElementById("moduleSearch");
    search.focus();
    search.addEventListener("input", ()=>{
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() =>{
        moduleFunction.findModules(search.value, courseFunctions.getCourse(courseCode).modules);
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
  },

  dropDownMenu(){
    let menuHtml =
    `
      <div class="menu-container">
        <div class="menu-item edit-course">edit course</div>
        <div class="menu-item edit-modules">edit course modules</div>
      </div>
    `;

    const edit = document.querySelector(".edit-container");
    if(!edit.querySelector(".menu-container")){
      edit.insertAdjacentHTML("afterbegin", menuHtml);

      edit.classList.add("tooltip-disabled");
    }

    document.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        const choice = item.classList.contains("edit-modules")
          ? () => {
              this.addCourseTable();
              moduleFunction.loadModules(courseFunctions.getCourse(courseCode).modules);

              function handleClickOutside(e) {
                const module = document.querySelector(".modules-container");
                const addImg = document.querySelector(".edit-img");

                if (module && !module.contains(e.target) && e.target !== addImg && !item.contains(e.target)) {
                  render.removeTable();
                  document.removeEventListener("click", handleClickOutside);
                }
              }

              setTimeout(() => {
                document.addEventListener("click", handleClickOutside);
              }, 0);
            }
          : () => {
            render.editCourseInfo(); 
            
            document.querySelector(".confirm")
            .addEventListener("click", async () =>{
              let name = document.getElementById("edit-courseName");
              let course = courseFunctions.getCourse(courseCode);

              course.courseName = name.value.toUpperCase();

              await courseFunctions.updateCourse(course);
              await courseFunctions.loadCourseInfo();

              render.removeEditCourseInfo();
            });
          };

        choice();
      });
    });
  },

  editCourseInfo(){
    let editHtml =
    `
    <div class="js-info">
      <div class="enter-info-container">
        <div class="edit-item">
          <p>Course name:</p>
          <input 
          type="text"
          id="edit-courseName"
          autocomplete="off"
          value="${courseFunctions.getCourse(courseCode).courseName}"
          >
        </div>

        <div class="edit-item">
          <p>Faculty:</p>
          <select id="edit-faculty" name="faculty">
            <option value="all" selected>ICT</option>
            <option value="1">Science</option>
            <option value="2">Humanities</option>
          </select>
        </div>

        <div class="edit-item">
          <p>Faculty:</p>
          <select id="edit-department" name="department">
            <option value="all" selected>Computer Science</option>
            <option value="1">Computer Systems and Engineering</option>
            <option value="2">Informatics</option>
          </select>
        </div>
      </div>

      <div class="button-container">
        <button class="confirm">Confirm</button>
      </div>
    </div>
    `;

    const container = document.querySelector(".container");
    if (!container.querySelector(".js-info")) {
      document.querySelector(".modules-display-header")
      .insertAdjacentHTML(
        "afterend", editHtml
      );

      render.removeMenu();
    }
    
  },

  removeEditCourseInfo(){
    const info = document.querySelector(".js-info");
    if(info) info.remove();
  },

  removeMenu(){
    const menu = document.querySelector(".menu-container");
    if(menu) menu.remove();
  }
};

async function initPage() {
  render.moduleTable(courseCode);
  await courseFunctions.loadCourseInfo();

  document.body.classList.remove("loading");
}

document.addEventListener("DOMContentLoaded", initPage);

document.querySelector(".edit-img")
.addEventListener("click", ()=>{
  render.dropDownMenu()
  //render.addCourseTable();

  function handleClickOutside(e) {
    const menu = document.querySelector(".menu-container");
    const addImg = document.querySelector(".edit-img");
    if(!menu.contains(e.target) && e.target !== addImg){
      render.removeMenu();
      edit.classList.remove("tooltip-disabled");
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
});

