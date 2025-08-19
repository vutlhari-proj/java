export class Student{
  studNum;
  name;
  surname;
  courseName;

  constructor(studentDetails){
    this.studNum = studentDetails.studNum;
    this.name = studentDetails.name;
    this.surname = studentDetails.surname;
    this.courseName = studentDetails.courseName || studentDetails.courseCode || "";
  }

  toRequestBody(){
    return {
      studNum: this.studNum,
      name: this.name,
      surname: this.surname,
      course: { code: this.courseName }
    };
  }
}

export let students = [];
export const studentFunctions = {
  student: null,

  async addStudent(studDetails){
    this.student = new Student(studDetails);

    const response = await fetch("http://localhost:8081/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.student.toRequestBody())
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    document.querySelector(".students-container").innerHTML += `
      <div class="student">
          <p class="name">${this.student.name} ${this.student.surname}</p>
          <p class="student-number">${this.student.studNum}</p>
          <p class="modules">${this.student.courseName}</p>
      </div>
    
    `;

    students.push(this.student);
    alert("Student added")

   
  },

  async loadStudents(){
    const res = await fetch('/api/students');
    const studentsJson = await res.json();

    students = studentsJson.map((s) => new Student(s));
  },

  getStudent(param) {
  // if para is only digits, search by student number
  if (/^\d+$/.test(param)) {
    return students.filter((student) => 
      student.studNum.includes(param)
    );
  } 
  // otherwise, search by fullname
  else {
    return students.filter((student) => {
      let fullname = student.name + " " + student.surname;
      return fullname.toLowerCase().includes(param.toLowerCase());
    });
  }
}

    
}
