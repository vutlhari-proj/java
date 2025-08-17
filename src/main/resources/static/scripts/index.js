import { Student, studentFunctions } from "./student/student.js";

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
};

document.querySelector(".add-image-container").addEventListener("click", () => {
  document.querySelector(".js-sidebar").classList.add("sidebar-edit");
  document.querySelector(".js-sidebar").innerHTML +=
    rendering.studentDetailForm();
  document.querySelector(".add-image-container").classList.add("add-image-container-invisible");
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
            studentFunctions.addStudent({
                studNum: student.studNum,
                name: student.name,
                surname: student.surname,
                courseCode: student.courseCode
            });

            document.getElementById("studentForm").remove();
            document.querySelector(".js-sidebar").classList.remove("sidebar-edit");
            document.querySelector(".add-image-container").classList.remove("add-image-container-invisible");
        } else {
            alert("no empty fields");
        }
    }
});