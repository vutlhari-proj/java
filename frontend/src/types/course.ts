export interface CourseProp {
  code: string;
  courseName: string;
  modules: ModuleProp[];
}

export interface ShortCourseProp {
  code: string;
  courseName: string;
}

export interface CoursesProp{
  courses: CourseProp[] | ShortCourseProp[];
}

export interface ModuleProp{
  code: string;
  moduleName: string;
}