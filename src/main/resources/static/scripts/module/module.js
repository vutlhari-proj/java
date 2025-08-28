import { courseFunctions } from "../course/course.js";
export class Module{
  code;
  moduleName;

  constructor(courseDetail){
    this.code = courseDetail.code;
    this.moduleName = courseDetail.moduleName;
  }
}

export let modules = [];
export const moduleFunction = {
  module: null,
  courses: [],

  async addModule(moduleDetails){
    try{
      this.module = new Module(moduleDetails);

      const response = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.module)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let savedModule = await response.json();
      modules.push(savedModule);

      document.querySelectorAll("tr.input-row").forEach(row => row.remove());

      document.querySelector(".js-body")
      .innerHTML += 
      `
        <tr>
          <td>${savedModule.code}</td>
          <td>${savedModule.moduleName}</td>
        </tr>
      `
    }
    catch(error){
      alert("Could not add module");
    }
  },

  async loadModules(moduleCodes = []){
    await this.populateModules();

    let moduleHtml = ``;
    modules.forEach((module) =>{
      let exists = "";
      exists = moduleCodes.some(mod => mod.code === module.code) ? "exists" : "";
       
      moduleHtml += 
      `
        <tr class="module ${exists}" data-code="${module.code}">
          <td>
            ${module.code}
            <span class="tooltip">remove from course</span>
          </td>
          <td>${module.moduleName}</td>
        <tr/>
      `
    });

    document.querySelector(".js-body")
    .innerHTML = moduleHtml;
  }, 
  
  findModules(input, moduleCodes = []){
    let filterHtml = ``;
    modules.forEach((module) =>{
      if((`${module.code} ${module.moduleName}`)
        .toLowerCase().includes(input.toLowerCase())){
          let exists = "";
          exists = moduleCodes.some(mod => mod.code === module.code) ? "exists" : "";
          filterHtml += 
          `
              <tr class="module ${exists}" data-code="${module.code}">
                <td>
                  ${module.code}
                  <span class="tooltip">remove from course</span>
                </td>
                <td>${module.moduleName}</td>
              <tr/>
          `;
      }
    });
    

    document.querySelector(".js-body")
    .innerHTML = filterHtml;
  },

  async getModule(moduleCode){
    try {
      const response = await fetch(`/api/modules/${moduleCode}`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(moduleCode)
      });

      if (!response.ok) {
        console.log(response.status);
      }

      const addedModule = await response.json();

      return addedModule;
    } catch (error) {
      alert("unable to get module")
    }
    
  },

  async populateModules(){
    const response = await fetch("/api/modules");
    const modulesJson = await response.json();

    modules = modulesJson.map((module) => new Module(module));
  },

  async inCourses(){
    await this.populateModules();

    const params = new URLSearchParams(window.location.search);
    const moduleCode = params.get("code");

    const response = await fetch(`/api/modules/${moduleCode}/courses`);
    this.courses = await response.json();

    const module = modules.find(module => module.code === moduleCode);
    document.querySelector(".moduleName").textContent = module.moduleName;
    document.querySelector(".code").textContent = moduleCode;

    this.renderCourses();
  },

  renderCourses(){
    const courseTable = document.querySelector(".courses");
    courseTable.innerHTML = "";

    let courseHtml = ``;
    this.courses.forEach(course =>{
      courseHtml+=
      `
      <tr class="course">
        <td>${course.code}</td>
        <td>${course.courseName}</td>
      </tr>
      `;
    });

    courseTable.insertAdjacentHTML("beforeend", courseHtml);
  },

  addCourses(courses){
    courses.forEach(course =>{
      if (!this.courses.some((c) => c.code === course.code)) {
        this.courses.push(course);
      }
    })

    this.renderCourses;
  },

  removeCourses(courseCodes){
    courseCodes.forEach(courseCode =>{
      this.courses = this.courses.filter((c) => c.code !== courseCode);
    });

    this.renderCourses();
  },

  moduleEventListeners() {
    const rows = document.querySelectorAll("tr.module");
    rows.forEach((row) => {
      row.addEventListener("click", async () => {
        if (row.classList.contains("loading")) return; // prevent double click
        row.classList.add("loading");
        row.style.pointerEvents = "none";

        try {
          const modCode = row.dataset.code;
          this.module = modules.find((module) => module.code === modCode);
          const params = new URLSearchParams(window.location.search);
          const courseCode = params.get("code");
          const course = courseFunctions.getCourse(courseCode);

          if (row.classList.contains("exists")) {
            // Remove module
            course.modules = course.modules.filter(mod => mod.code !== modCode);
            await courseFunctions.updateCourse(course);
            row.classList.remove("exists");

            courseFunctions.removeModule(modCode);
          } else {
            // Add module
            const temp = [this.module.code];
            await courseFunctions.addModulesToCourse(courseCode, temp);

            courseFunctions.addModule(this.module);
            row.classList.add("exists");
          }

          
        } catch (err) {
          console.error(err);
          alert("Error updating course modules");
        } finally {
          row.classList.remove("loading");
          row.style.pointerEvents = "auto";
        }
      });
    });
  }
}

const renderModuleTable = (moduleDetails) => {
  const table = document.querySelector(".");
}