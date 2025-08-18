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

  renderMenu(){
    return `
      <div class="menu-bar">
        <div class="menu-bar-header">
          <div class="menu-header-icon">
            <img class="menu" src="images/menu.svg">
          </div>
        </div>

        <div class="menu-body">
          <a class="menu-item add-student">
            <di
          </a>
        </div>
      </div>
    `;
  }
};
rendering.renderStudents();

document.querySelector(".js-add-image-container").addEventListener("click", () => {
  document.querySelector(".js-sidebar").classList.add("sidebar-edit");
  document.querySelector(".js-sidebar").innerHTML += rendering.studentDetailForm();
  document.querySelector(".js-add-image-container").classList.add("add-image-container-invisible");


  const form = document.querySelector("#studentForm");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
        else form.querySelector(".submit").click();
      }
    });
  });
});

document.querySelector(".js-sidebar").addEventListener("click", (e) => {
    if (e.target.classList.contains("submit")) {
        const student = {
            studNum: document.querySelector("#studNum").value,
            name: document.querySelector("#name").value,
            surname: document.querySelector("#surname").value,
            courseCode: document.querySelector("#courseCode").value,
        };

        if (["studNum", "name", "surname", "courseCode"].every((key) => student[key]?.trim())) {
            studentFunctions.addStudent(student);

            document.getElementById("studentForm").remove();
            document.querySelector(".js-sidebar").classList.remove("sidebar-edit");
            document.querySelector(".add-image-container").classList.remove("add-image-container-invisible");
        } else {
            alert("no empty fields");
        }
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