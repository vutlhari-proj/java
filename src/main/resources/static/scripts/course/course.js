export class Course{
  code;
  courseName;
  modules;

  constructor(courseDetails){
    this.code = courseDetails.code;
    this.courseName = courseDetails.courseName;
    this.modules = courseDetails.modules || null;
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

      document.querySelector(".js-body")
      .insertAdjacentHTML( 
        "beforeend",
        `
          <tr class="${savedCourse.code}">
            <td>${savedCourse.code}</td>
            <td>${savedCourse.courseName}</td>
          </tr>
        `
      )  
    }
    catch(error){
      alert("Could not add course");
    }
  },

  async loadCourses(){
    await this.populateCourses();

    let courseHtml = ``;
    courses.forEach((course) =>{
      courseHtml += 
      `
        <tr class="${course.code}">
          <td>${course.code}</td>
          <td>${course.courseName}</td>
        </tr>
      `;
    });

    document.querySelector(".js-body")
    .insertAdjacentHTML(
      "beforeend", courseHtml
    );
  }, 

  findCourses(input){
    let filterHtml = ``;
    courses.forEach((course) =>{
      if((`${course.code} ${course.courseName}`)
        .toLowerCase().includes(input.toLowerCase())){
        filterHtml += 
        `
            <tr class="${course.code}">
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

  async loadCourseInfo(){
    await this.populateCourses();

    const params = new URLSearchParams(window.location.search);
    const courseCode = params.get("code");
    this.course = courses.find((course) => course.code === courseCode);

    document.querySelector(".courseName").innerHTML = this.course.courseName;
    document.querySelector(".code").innerHTML = this.course.code;


    if (!this.course.modules || this.course.modules.length === 0) {
      const noModulesHtml = `<h1>No Modules Have Been Added</h1>`;
      document.querySelectorAll(".modules").forEach((mod) => mod.innerHTML = noModulesHtml);
    } else {
      // Clear all year tables first
      [".first-year", ".second-year", ".third-year", ".fourth-year"].forEach(selector => {
        const tableBody = document.querySelector(selector);
        if (tableBody) tableBody.innerHTML = "";
      });

      // Iterate and categorize
      this.course.modules.forEach((module) => {
        const moduleHtml = `
          <tr>
            <td>${module.code}</td>
            <td>${module.moduleName}</td>
          </tr>
        `;

        let targetBody;
        if (module.code.includes("11") || module.code.includes("105") || module.code.includes("125")) {
          targetBody = document.querySelector(".year-1");
        } else if (module.code.includes("21")) {
          targetBody = document.querySelector(".year-2");
        } else if (module.code.includes("31")) {
          targetBody = document.querySelector(".year-3");
        } else{
          targetBody = document.querySelector(".year-4");
        }

        if(targetBody) targetBody.insertAdjacentHTML("beforeend", moduleHtml);
      });
    }

  },

  async updateCourse(course) {
    this.course = new Course(course);

    try {
      const url = `/api/courses/${encodeURIComponent(this.course.code)}/update`;
      console.log("Fetching URL:", url);

      const response = await fetch(url, {
        method: "POST",
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
      const response = await fetch(`/api/courses/${courseCode}/delete`, {
      method: "POST",
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
  }
}