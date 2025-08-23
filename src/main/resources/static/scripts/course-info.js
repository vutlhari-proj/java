import { courseFunctions } from "./course/course.js";
import { moduleFunction } from "./module/module.js";
courseFunctions.loadCourseInfo();

document.querySelector(".add-img")
.addEventListener("click", ()=>{
  render.addCourseTable();

  moduleFunction.loadModules();
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
  }
}