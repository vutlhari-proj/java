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
  
  getStudent(studNum){
    return students.find((student) => student.studNum == studNum);
  }
}
