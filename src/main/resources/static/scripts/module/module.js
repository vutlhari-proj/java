export class Module{
  code;
  moduleName;

  constructor(courseDetail){
    this.code = courseDetail.code;
    this.moduleName = courseDetail.moduleName;
  }
}

export let modules = [];
export const moduleFunction = {
  module: null,

  async addModule(moduleDetails){
    try{
      this.module = new Module(moduleDetails);

      const response = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.module)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let savedModule = await response.json();
      modules.push(savedModule);

      document.querySelectorAll("tr.input-row").forEach(row => row.remove());

      document.querySelector(".js-body")
      .innerHTML += 
      `
        <tr>
          <td>${savedModule.code}</td>
          <td>${savedModule.moduleName}</td>
        </tr>
      `
    }
    catch(error){
      alert("Could not add module");
    }
  },

  async loadModules(){
    const response = await fetch("/api/modules");
    const modulesJson = await response.json();

    modules = modulesJson.map((module) => new Module(module));

    let moduleHtml = ``;
    modules.forEach((module) =>{
      moduleHtml += 
      `
        <tr>
          <td>${module.code}</td>
          <td>${module.moduleName}</td>
        <tr/>
      `
    });

    document.querySelector(".js-body")
    .innerHTML = moduleHtml;
  }, 
  
  findModules(input){
    let filterHtml = ``;
    modules.forEach((module) =>{
      if((`${module.code} ${module.moduleName}`)
        .toLowerCase().includes(input.toLowerCase())){
        filterHtml += 
        `
            <tr>
              <td>${module.code}</td>
              <td>${module.moduleName}</td>
            <tr/>
        `;
      }
    });
    

    document.querySelector(".js-body")
    .innerHTML = filterHtml;
  }
}