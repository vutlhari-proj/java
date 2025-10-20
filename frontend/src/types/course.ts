import type { ModuleProp } from "./module";

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