import { Course, courseFunctions, courses } from "./course/course.js";
import { capitalizeWords } from "./utility/utility.js";
courseFunctions.loadCourses();

document.querySelector(".add-course-img").addEventListener("click", ()=>{
  render.newCourse();

  const code = document.getElementById("code");
  code.focus();

  const name = document.getElementById("name");

  code.addEventListener("keydown", (e)=>{
    if (e.key == "Enter" && code.value.trim() != null ) {
      code.blur();
      name.focus();
    }
  });

  name.addEventListener("keydown", (e)=>{
    if (e.key == "Enter" && name.value.trim() != null ) {
      courseFunctions.addCourse({code: code.value.toUpperCase(), courseName: capitalizeWords(name.value)});
    }
  });

});

const render = {
  newCourse(){
    document.querySelector(".js-body")
    .innerHTML +=
    `
      <tr class="input-row">
        <td>
          <input type="text" id="code" placeholder="course code..." autocomplete="off" required>
        </td>

        <td>
          <input type="text" id="name" placeholder="course name..." autocomplete="off" required>
        </td>
      </tr>
    `;
  }
}