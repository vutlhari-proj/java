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
      body: JSON.stringify(this.student,toRequestBody())
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("Student added")

   
  },

  async loadStudents(){
    const res = await fetch('/api/students');
    const studentsJson = await res.json();

    students = studentsJson.map((s) => new Student(s));
  },

  getStudent(studNum){
    return students.find((student) => student.studNum == studNum);
  }
}
