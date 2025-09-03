import { moduleFunction } from "../module/module.js";

export class Course{
  code;
  courseName;
  modules;
  department;

  constructor(courseDetails){
    this.code = courseDetails.code;
    this.courseName = courseDetails.courseName;
    this.modules = courseDetails.modules || null;
    this.department = courseDetails.department || null;
  }
}

export let courses = [];
export const courseFunctions = {
  course: null,

  async addCourse(courseDetails){
    try{
      this.course = new Course(courseDetails);
    
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.course)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedCourse = await response.json();
      courses.push(savedCourse);

      document.querySelectorAll("tr.input-row").forEach(row => row.remove()); 
    }
    catch(error){
      alert("Could not add course");
    }
  },

  async loadCourses(courseCodes = []){
    await this.populateCourses();

    let courseHtml = ``;
    courses.forEach((course) =>{
      let exists = ``;
      exists = courseCodes.some((co) => co.code === course.code) ? "exists" : "";
      courseHtml += 
      `
        <tr class="course ${exists}" data-code="${course.code}">
          <td>${course.code}</td>
          <td>${course.courseName}</td>
        </tr>
      `;
    });

    document.querySelector(".js-body")
    .innerHTML = courseHtml;
  }, 

  findCourses(input, courseCodes = []){
    let filterHtml = ``;
    courses.forEach((course) =>{
      if((`${course.code} ${course.courseName}`)
        .toLowerCase().includes(input.toLowerCase())){
        let exists = "";
        exists = courseCodes.some((co) => co.code === course.code) ? "exists" : "";

        filterHtml += 
        `
            <tr class="course ${exists}" data-code="${course.code}">
              <td>${course.code}</td>
              <td>${course.courseName}</td>
            </tr>
        `;
      }
    });
    

    document.querySelector(".js-body")
    .innerHTML = filterHtml;
  },

  async addModulesToCourse(code, moduleCodes){
    try {
      const response = await fetch(`/api/courses/${code}/modules`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(moduleCodes)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      alert("couldn't add modules" + error.message());
    }

  },

  async loadCourseInfo() {
    await this.populateCourses();

    const params = new URLSearchParams(window.location.search);
    const courseCode = params.get("code");
    this.course = courses.find((course) => course.code === courseCode);

    document.querySelector(".courseName").textContent = this.course.courseName;
    document.querySelector(".code").textContent = this.course.code;

    this.renderModules();
  },

  async renderModules() {
    const config = await this.loadModConfig();

    const modulesContainer = document.querySelectorAll(".modules");

    if (!this.course.modules || this.course.modules.length === 0) {
      modulesContainer.forEach((mod) => (mod.innerHTML = `<h1>No Modules Have Been Added</h1>`));
      return;
    }

    // Clear all year tables first
    [".year-1", ".year-2", ".year-3", ".year-4"].forEach((selector) => {
      const tableBody = document.querySelector(selector);
      if (tableBody) tableBody.innerHTML = "";
    });

    // Fill year tables
    this.course.modules.forEach((module) => {
      const moduleHtml = `
        <tr>
          <td>${module.code}</td>
          <td>${module.moduleName}</td>
        </tr>
      `;

      let targetBody;
      for (const [yr, patterns] of Object.entries(config.yearRules)) {
        if (patterns.some(p => module.code.toLowerCase().includes(p.toLowerCase()))) {
          targetBody = document.querySelector(`.year-${yr}`);
          break;
        }
      }

      targetBody?.insertAdjacentHTML("beforeend", moduleHtml);
    });
  },

  addModule(module) {
    // Prevent duplicates
    if (!this.course.modules.some((m) => m.code === module.code)) {
      this.course.modules.push(module);
      this.renderModules();
    }
  },

  removeModule(moduleCode) {
    // Filter out module
    this.course.modules = this.course.modules.filter((m) => m.code !== moduleCode);
    this.renderModules();
  },


  async updateCourse(course) {
    this.course = new Course(course);

    try {
      const url = `/api/${encodeURIComponent(this.course.code)}`;
      console.log("Fetching URL:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.course),
      });

      // Check if fetch completed at all
      console.log("Fetch completed, response:", response);

      if (!response.ok) {
        const errorText = await response.text(); // get server error message
        console.error("Server error:", response.status, errorText);
        throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
      }

      const updatedCourse = await response.json();
      console.log("Updated course from server:", updatedCourse);

      let index = courses.findIndex(c => c.code === updatedCourse.code);
      (index !== -1) && (courses[index] = updatedCourse);

    } catch (error) {
      console.error("Error updating course: coursejs", error);
      alert("Couldn't edit course: " + error.message);
    }
  },

  async deleteCourse(courseCode){
    try{
      const response = await fetch(`/api/${courseCode}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(courseCode)
      });
    }
    catch(error){
      alert("Failed to delete course");
    }
  },

  getCourse(code){
    this.populateCourses();

    return courses.find((course) => course.code === code);
  },

  async populateCourses(){
    const res = await fetch("/api/courses");
    const coursesJson = await res.json();

    courses = coursesJson.map((course) => new Course(course));
  },

  async loadConfig(){
    const res = await fetch("/config/courseCategories.json")
    return await res.json();
  },

  async loadModConfig() {
    const res = await fetch("/config/moduleMapping.json")
    return await res.json();
  },
  
  courseEventListeners(){
    const rows = document.querySelectorAll("tr.course");
    rows.forEach((row) => {
      let isProccessing = false
      row.addEventListener("click", async () => {
        if(isProccessing) return;
        isProccessing = true;

        row.classList.add("loading");
        row.style.pointerEvents = "none";
        try {
          const courseCode = row.dataset.code;

          if (row.classList.contains("exists")) {
            this.addPill(courseCode, true);
          } else {
            this.addPill(courseCode)
          }

          
        } catch (err) {
          console.error(err);
          alert("Error updating course modules");
        } finally {
          isProccessing = false;
          row.style.pointerEvents = "";
          row.classList.remove("loading");
        }
      });
    });
  },

  addPill(code, exists = false){
    const input = document.getElementById("courseSearch");
    const inputWrapper = document.querySelector(".input-wrapper");

    if (inputWrapper.querySelector(`.code-pill[data-code="${code}"]`)) {
      return; // do nothing if duplicate
    }

    const pill = document.createElement("div");
    pill.classList.add("code-pill");

    pill.dataset.code = code;
    pill.innerHTML = `${code} <span>&times;</span>`;

    exists && pill.classList.add("to-remove");

    pill.querySelector("span").addEventListener("click", (e) => {
      e.stopPropagation();
      pill.remove();
    });

    inputWrapper.insertBefore(pill, input);

    input.focus();
  }
  
}