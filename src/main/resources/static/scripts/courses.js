import { Course, courseFunctions, courses } from "./course/course.js";
import { capitalizeWords, toggleElementByPermission } from "./utility/utility.js";

async function init() {
  await courseFunctions.loadCourses();
  await toggleElementByPermission("course", "CREATE", ".add-img");
}
document.addEventListener("DOMContentLoaded", async () => {
  await init();
});

document.querySelector(".add-img").addEventListener("click", ()=>{
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

  name.addEventListener("keydown", async (e)=>{
    if (e.key == "Enter" && name.value.trim() != null ) {
      await courseFunctions.addCourse({code: code.value.toUpperCase(), courseName: capitalizeWords(name.value)});

      await courseFunctions.loadCourses();
    }
  });

  function handleClickOutside(e) {
    const inputRow = document.querySelector(".input-row");
    const addImg = document.querySelector(".add-img");
    if(!inputRow.contains(e.target) && e.target !== addImg){
      render.removeInputRow();
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);

});

document.querySelector(".search-img").addEventListener("click", ()=>{
  render.search();

  const search =document.getElementById("search");
  search.focus();

  function handleClickOutside(e) {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector("#search");

    if (searchInput && !searchContainer.contains(e.target)) {
      render.removeSearch();
      document.removeEventListener("click", handleClickOutside);
    }
  }

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 0);
});

document.querySelector(".js-body").addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row || row.classList.contains("input-row")) return; // clicked outside row
  
  window.location.href = `/course-info?code=${encodeURIComponent(row.dataset.code)}`;
});

const render = {
  newCourse(){
    const body = document.querySelector(".js-body");
    if(!body.querySelector(".input-row")){
      body.insertAdjacentHTML(
        "beforeend",
        `
          <tr class="input-row">
            <td>
              <input type="text" id="code" placeholder="course code..." autocomplete="off" required>
            </td>

            <td>
              <input type="text" id="name" placeholder="course name..." autocomplete="off" required>
            </td>
          </tr>
        `
      );
    }
  },

  removeInputRow(){
    const inputRow = document.querySelector(".input-row");
    if(inputRow) inputRow.remove();
  },

  search(){
    const container = document.querySelector(".search-container");

    if (!container.querySelector(".search")) {
      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="search">
            <input type="text" id="search" placeholder="course code/name..." autocomplete="off">
          </div>
        `
      );

      let typingTimer;
      const search =document.getElementById("search");
      search.addEventListener("input", ()=>{
        clearTimeout(typingTimer);

        typingTimer = setTimeout(() =>{
          courseFunctions.findCourses(search.value);
        }, 300);
      });
    }

    const tooltip = container.querySelector(".search-tooltip");
    tooltip?.classList.add("js-tooltip");
    tooltip?.classList.remove("tooltip");
  },

  removeSearch() {
    const searchInput = document.querySelector(".search");
    if (searchInput) searchInput.remove();

    const tooltip = document.querySelector(".search-tooltip");
    tooltip?.classList.remove("js-tooltip");
    tooltip?.classList.add("tooltip");
  }
}
