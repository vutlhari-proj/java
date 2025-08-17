export class Student{
  studNum;
  name;
  surname;
  course;

  constructor(studentDetails){
    this.studNum = studentDetails.studNum;
    this.name = studentDetails.name;
    this.surname = studentDetails.surname;
    this.course = {code: studentDetails.courseCode};
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
      body: JSON.stringify(this.student)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("Student added")

   
  },

  async loadStudents(){
    const res = await fetch('/api/tsudents');
    const students = await res.json();
  },

  getStudent(studNum){
    return students.find((student) => student.studNum == studNum);
  }
}
