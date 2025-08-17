export class Student{
  studnum;
  name;
  surname;
  course;

  constructor(studentDetails){
    this.studnum = studentDetails.studnum;
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

    try {
    const response = await fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.student)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    alert("Student added")

    } catch (err) {
      alert("Student addition failed");
    }
  },

  getStudent(studNum){
    return students.find((student) => student.studNum == studNum);
  }
}
