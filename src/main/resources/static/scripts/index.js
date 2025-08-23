import { students, studentFunctions } from "./student/student.js";

const rendering = {
  studentDetailForm() {
    return `
      <div id="studentForm">
        <div class="info-containers">
          <p>Student Number: <p> 
          <input type="text" id="studNum" required />
        </div>
        
        <div class="info-containers">
          <p>Name: <p> 
          <input type="text" id="name" required />
        </div>

        <div class="info-containers">
          <p>Surname: <p> 
          <input type="text" id="surname" required />
        </div>

        <div class="info-containers">
          <p>Course Code: <p> 
          <input type="text" id="courseCode" required />
        </div>

        <div class="button-container">
          <button class="submit">Add Student</button>
        </div>
      </div>
    `;
  },

  async renderStudents(){
    await studentFunctions.loadStudents();

    let studentHtml = ``;
    students.forEach((student) =>{
      studentHtml += `
        <div class="student">
          <p class="name">${student.name} ${student.surname}</p>
          <p class="student-number">${student.studNum}</p>
          <p class="modules">${student.courseName}</p>
        </div>
      `
    });
    
    document.querySelector(".students-container").innerHTML = studentHtml;
  },

  renderSearchedStudents(search){
    let studentHtml = ``;
    studentFunctions.getStudent(search)
    .forEach((student) =>{
      studentHtml += `
        <div class="student">
          <p class="name">${student.name} ${student.surname}</p>
          <p class="student-number">${student.studNum}</p>
          <p class="modules">${student.courseName}</p>
        </div>
      `;
    });

    document.querySelector(".students-container").innerHTML = studentHtml;
  }
};

async function initPage() {
  await rendering.renderStudents();

  document.body.classList.remove("loading");
}
document.addEventListener("DOMContentLoaded", initPage);

const search = document.getElementById("search");
search.addEventListener("keydown", (e) =>{
  if(e.key == "Enter"){
    rendering.renderSearchedStudents(search.value);
    search.blur();
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  await studentFunctions.loadStudents();
  rendering.renderStudents();
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(0, 136, 255, 0.95)"; // more solid
  } else {
    header.style.background = "rgba(0, 136, 255, 0.6)";  // more transparent
  }
});