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
      .innerHTML += 
      `
        <tr>
          <td>${savedCourse.code}</td>
          <td>${savedCourse.courseName}</td>
        </tr>
      `
    }
    catch(error){
      alert("Could not add course");
    }
  },

  async loadCourses(){
    const res = await fetch("/api/courses");
    const coursesJson = await res.json();

    courses = coursesJson.map((course) => new Course(course));

    let courseHtml = ``;
    courses.forEach((course) =>{
      courseHtml += 
      `
        <tr>
          <td>${course.code}</td>
          <td>${course.courseName}</td>
        <tr/>
      `;
    });

    document.querySelector(".js-body")
    .innerHTML = courseHtml;
  }, 

  findCourses(input){
    let filterHtml = ``;
    courses.forEach((course) =>{
      if((`${course.code} ${course.courseName}`)
        .toLowerCase().includes(input.toLowerCase())){
        filterHtml += 
        `
            <tr>
              <td>${course.code}</td>
              <td>${course.courseName}</td>
            <tr/>
        `;
      }
    });
    

    document.querySelector(".js-body")
    .innerHTML = filterHtml;
  }
}