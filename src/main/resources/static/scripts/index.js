import { Student, studentFunctions } from "./student/student.js";

const rendering = {
  studentDetailForm(){
    return `
      <form id="studentForm">
        <label>Student Number: <input type="text" id="studNum" required /></label><br/>
        <label>Name: <input type="text" id="name" required /></label><br/>
        <label>Surname: <input type="text" id="surname" required /></label><br/>
        <label>Course Code: <input type="text" id="courseCode" required /></label><br/>
        <button type="submit">Add Student</button>
      </form>
    `;
  }
};

document.querySelector(".add-image-container").addEventListener("click", () => {
  document.querySelector(".js-sidebar").classList.add("sidebar-edit");
  document.querySelector(".js-sidebar").innerHTML += rendering.studentDetailForm();
});