import { Student, studentFunctions } from "./student/student.js";

const rendering = {
  studentDetailForm(){
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
  }
};

document.querySelector(".add-image-container").addEventListener("click", () => {
  document.querySelector(".js-sidebar").classList.add("sidebar-edit");
  document.querySelector(".js-sidebar").innerHTML += rendering.studentDetailForm();
  document.querySelector(".add-image-container").classList.add("add-image-container-invisible")
});