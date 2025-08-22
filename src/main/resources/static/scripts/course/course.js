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
          <tr class="${savedCourse.code}>
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
        <tr/>
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
            <tr class="${course.code}>
              <td>${course.code}</td>
              <td>${course.courseName}</td>
            <tr/>
        `;
      }
    });
    

    document.querySelector(".js-body")
    .innerHTML = filterHtml;
  },

  async loadCourseInfo(){
    await this.populateCourses();

    const code = localStorage.getItem("selectedCourse");
    this.course = courses.find((course) => course.code === code);

    document.querySelector(".courseName").innerHTML = this.course.courseName;
    document.querySelector(".code").innerHTML = this.course.code;
    
    let displayHtml = ``;
    if(!this.course.modules || this.course.modules.length === 0){
      displayHtml += `<h1>No Modules Have Been Added<h1>`;
      document.querySelector(".tables").innerHTML = displayHtml;
    }
  },

  async populateCourses(){
    const res = await fetch("/api/courses");
    const coursesJson = await res.json();

    courses = coursesJson.map((course) => new Course(course));
  }
}