import { moduleFunction } from "./module/module.js";
import { capitalizeWords } from "./utility/utility.js";
moduleFunction.loadModules();

document.querySelector(".add-course-img").addEventListener("click", ()=>{
  render.newModule();

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
      moduleFunction.addModule({code: code.value.toUpperCase(), moduleName: capitalizeWords(name.value)});
    }
  });

});

const render = {
  newModule(){
    document.querySelector(".js-body")
    .innerHTML +=
    `
      <tr class="input-row">
        <td>
          <input type="text" id="code" placeholder="module code..." autocomplete="off" required>
        </td>

        <td>
          <input type="text" id="name" placeholder="module name..." autocomplete="off" required>
        </td>
      </tr>
    `;
  }
}