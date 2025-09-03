import { moduleFunction } from "./module/module.js";
import { courseFunctions } from "./course/course.js";
import { capitalizeWords } from "./utility/utility.js";

const param = new URLSearchParams(window.location.search);
const moduleCode = param.get("code");

const render ={
  addCourseTable(){
    let tableHtml = 
    `
   <div class="courses-container">
      <h2 class="courses-title">Courses</h2>

      <!-- Search bar -->
      <div class="courses-search input-wrapper">
        <input 
          type="text" 
          id="courseSearch" 
          placeholder="Search course..." 
          autocomplete="off"
        />
      </div>

      <!-- Table -->
      <div class="courses-table-wrapper">
        <table class="courses-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody id="coursesBody" class="modules-body js-body">
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

    const display = document.querySelector(".courses-display");
    if(!display.querySelector(".courses-container")){
      display.insertAdjacentHTML("beforeend", tableHtml);
    }

    render.removeMenu();

    const tableWrapper = document.querySelector(".courses-table-wrapper");
    if (tableWrapper) {
      tableWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let typingTimer;
    const search =document.getElementById("courseSearch");
    search.focus();
    search.addEventListener("input", ()=>{
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() =>{
        courseFunctions.findCourses(search.value, moduleFunction.courses);
        courseFunctions.courseEventListeners();
      }, 800);
    });

    const inputWrapper = document.querySelector(".input-wrapper")
    search.addEventListener("keydown", (e) =>{
      if (e.key === "Backspace" && search.value === "") {
        const pills = inputWrapper.querySelectorAll(".code-pill");
        if (pills.length > 0) {
          pills[pills.length - 1].remove();
        }
      }

      if (e.key === "Enter") {
        search.value = "";
        const pills = inputWrapper.querySelectorAll(".code-pill");
        if (pills.length > 0) {
          const addCourseCodes = [];
          const removeCourseCodes = [];
          pills.forEach((pill) =>{
            if (pill.classList.contains("to-remove")) {
              removeCourseCodes.push(pill.dataset.code);
            } else {
              addCourseCodes.push(pill.dataset.code);
            }

            pill.remove();
          });

          try {
            (removeCourseCodes.length > 0) && moduleFunction.removeFromCourse(moduleCode, removeCourseCodes);
            (addCourseCodes.length > 0) && moduleFunction.addToCourse(moduleCode, addCourseCodes);
          } catch (error) {
            alert("add coursetbale error");
          }finally{
            moduleFunction.addCourses(addCourseCodes);
            moduleFunction.removeCourses(removeCourseCodes);
            courseFunctions.courseEventListeners();
          }
          
        }
      }
    });
  },

  removeTable(){
    const course = document.querySelector(".courses-container");
    if(course) course.remove();
  },

  dropDownMenu(){
    let menuHtml =
    `
      <div class="menu-container">
        <div class="menu-item edit-module">edit module</div>
        <div class="menu-item edit-courses">edit courses</div>
        <div class="menu-item delete-module">delete module</div>
      </div>
    `;

    const edit = document.querySelector(".edit-container");
    if(!edit.querySelector(".menu-container")){
      edit.insertAdjacentHTML("afterbegin", menuHtml);

      edit.classList.add("tooltip-disabled");
    }

    document.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", async () => {
        if(item.classList.contains("edit-module")){
          render.editModuleInfo();
        }
        else if(item.classList.contains("edit-courses")){
          render.addCourseTable();
          await courseFunctions.loadCourses(moduleFunction.courses);

          courseFunctions.courseEventListeners();

          function handleClickOutside(e) {
            const course = document.querySelector(".courses-container");
            const addImg = document.querySelector(".edit-img");

            // if click is inside the course container, ignore
            if (course && course.contains(e.target)) return;

            // if click is on the edit image, ignore
            if (e.target === addImg) return;

            // if click is inside a pill, ignore
            if (e.target.closest(".code-pill")) return;

            // otherwise it's truly outside
            render.removeTable();
            document.removeEventListener("click", handleClickOutside);
          }

          setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
          }, 0);
        }
        else{
          render.confirmationModal();
        }

      });
    });

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
  },

  async editModuleInfo(){
    let editHtml =
    `
    <div class="js-info">
      <div class="enter-info-container">
        <div class="edit-item">
          <p>Module name:</p>
          <input 
          type="text"
          id="edit-moduleName"
          autocomplete="off"
          value="${moduleFunction.module.moduleName}"
          >
        </div>

        <div class="edit-item">
          <p>NQF-Level:</p>
          <select id="edit-nqf-level" name="nqf-level">
            <option value="5" selected>5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="edit-item">
          <p>Credits:</p>
          <select id="edit-credits" name="credits">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
            <option value="15" selected>15</option>
            <option value="20">20</option>
            <option value="24">24</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="180">180</option>
            <option value="360">360</option>
          </select>
        </div>

        <div class="edit-item">
          <p>Module-Type:</p>
          <select id="edit-module-type" name="module-type">
            <option value="block" selected>Block</option>
            <option value="first-semester">First Semester</option>
            <option value="second-semester">Second Semester</option>
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
      document.querySelector(".courses-display-header")
      .insertAdjacentHTML(
        "afterend", editHtml
      );

       document.querySelector(".confirm")
        .addEventListener("click", async () =>{
          let name = document.getElementById("edit-moduleName");
          let module = moduleFunction.module;

          module.moduleName = capitalizeWords(name.value);

          await moduleFunction.updateModule(module);
          await moduleFunction.loadModuleInfo();

          render.removeEditModuleInfo();
        });
      render.removeMenu();
    }
    
  },

  confirmationModal(){
    let modalHtml =
    `
    <div id="overlay" class="overlay">
      <div class="modal">
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <div class="modal-buttons">
          <button id="confirmBtn">Yes</button>
          <button id="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", modalHtml);

    render.removeMenu();

    const confirm = document.getElementById("confirmBtn");
    confirm.addEventListener("click", async ()=>{
      await moduleFunction.deleteModule(moduleCode);

      window.location.href = `../pages/modules.html`;
    });

    const cancel = document.getElementById("cancelBtn");
    cancel.addEventListener("click", ()=>{
      render.removeModal();
    });
  },

  removeModal(){
    const modal = document.getElementById("overlay");
    if(modal) modal.remove();
  },

  removeEditModuleInfo(){
    const info = document.querySelector(".js-info");
    if(info) info.remove();
  },

  removeMenu(){
    const menu = document.querySelector(".menu-container");
    if(menu) menu.remove();
  }
};

async function initPage() {
  await moduleFunction.loadModuleInfo();

  document.body.classList.remove("loading");
}
document.addEventListener("DOMContentLoaded", initPage);

document.querySelector(".edit-img")
.addEventListener("click", () =>{
  render.dropDownMenu();
});

document.body.addEventListener("keydown", (e) => {
  const container = document.querySelector(".courses-container");
  const info = document.querySelector(".js-info");
  if (e.key === "Escape") {
    info && info.remove();
    container && container.remove();
  }
});
