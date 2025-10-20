import type { CoursesProp } from "./course";

export interface ModuleProp {
  code: string;
  moduleName: string; 
}

export interface ModuleExtendedProp extends ModuleProp {
  courses: CoursesProp
}