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


  async deleteModule(moduleCode){
    try{
      const response = await fetch(`/api/modules/${moduleCode}/delete`, {
        method: "POST",
        headers: {"Content-Type": "application/json"}
      });

      if (!response.ok) {
        console.log("couldnt delete")
      }
    }
    catch(error){
      alert("failed to delete module");
    }
  },

  async getModule(moduleCode){
    try {
      const response = await fetch(`/api/modules/${moduleCode}`);

      if (!response.ok) {
        console.log(response.status);
      }

      const addedModule = await response.json();

      return addedModule;
    } catch (error) {
      alert("unable to get module")
    }
    
  },

  async updateModule(module){
    try {
      const response = await fetch(`/api/modules/${module.code}/update`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(module)
      });

      this.module = await response.json();

      let index = modules.findIndex(m => m.code === this.module.code);
      (index !== -1) && (modules[index] = this.module);
    } catch (error) {
      alert("couldnt edit module: " + error.getMessage);
    }
  },

  async populateModules(){
    const response = await fetch("/api/modules");
    const modulesJson = await response.json();

    modules = modulesJson.map((module) => new Module(module));
  },

  async loadModuleInfo(){
    await this.populateModules();

    const params = new URLSearchParams(window.location.search);
    const moduleCode = params.get("code");

    const response = await fetch(`/api/modules/${moduleCode}/courses`);
    this.courses = await response.json();

    this.module = modules.find(module => module.code === moduleCode);
    document.querySelector(".moduleName").textContent = this.module.moduleName;
    document.querySelector(".code").textContent = moduleCode;

    this.renderCourses();
  },

  async addToCourse(code, courseCodes){
    try {
      const response = await fetch(`/api/modules/${code}/addToCourses`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(courseCodes)
      })

      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.courses = response.json();
      this.removeCourses();
    } catch (error) {
      console.log(error.message());
      alert("unable to add module to courses");
    }
    
  },

  async removeFromCourse(code, courseCodes){
    try {
      const response = await fetch(`/api/modules/${code}/removeFromCourses`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(courseCodes)
      });

      if(!response.ok){
        const errorText = await response.text(); // get server error message
        console.error("Server error:", response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
      }
    } catch (error) {
      alert("unable to delete, error: " + error.getMessage());
    }
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
      if (!this.courses.some((c) => c.code === course)) {
        this.courses.push(courseFunctions.getCourse(course));
      }
    });

    const rows = document.querySelectorAll("tr.course");
    rows.forEach((row) => {
      if (courses.some((c) => c === row.dataset.code)) {
        row.classList.add("exists");
      }
    });

    this.renderCourses;
  },

  removeCourses(courseCodes){
    courseCodes.forEach(courseCode =>{
      this.courses = this.courses.filter((c) => c.code !== courseCode);
    });

    const rows = document.querySelectorAll("tr.course");
    rows.forEach((row) => {
      if (courseCodes.some((c) => c === row.dataset.code)) {
        row.classList.remove("exists");
      }
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
