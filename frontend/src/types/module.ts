import type { ShortCourseProp } from "./course";

export interface ModuleProp {
  code: string;
  moduleName: string; 
}

export interface ModuleExtendedProp extends ModuleProp {
  type: string;
  nqf_level: number;
  credits: number;
  elective: boolean;
  prerequisites: ModuleProp[];
  courses: ShortCourseProp[];
}

export interface ModuleRequest extends ModuleProp {
  type: string;
  nqf_level: number;
  credits: number;
  elective: boolean;
  prerequisites: string[];
  courseCodes: string[];
}

type SearchType = "module" | "course" | string;
export interface ModuleSearchRequest{
  query: string;
  type: SearchType;
  department?: number;
}
interface ModuleOperationConfig<T = unknown> {
  apiEndpoint: string;
  payload?: (data: T) => T;
}

interface ModuleConfig {
  post: ModuleOperationConfig<ModuleExtendedProp>;
  put: ModuleOperationConfig<ModuleExtendedProp>;
  delete: ModuleOperationConfig<{ code: string }>;
  search: ModuleOperationConfig<ModuleSearchRequest>;
}

export const ModuleConfigs = (): Record<string, ModuleConfig> => ({
  module: {
    post:{
      apiEndpoint: '/api/modules',
      payload: (data: ModuleExtendedProp) => data
    },
    put:{
      apiEndpoint: '/api/modules/update',
      payload: (data: ModuleExtendedProp) => data
    },
    delete:{
      apiEndpoint: '/api/modules/delete',
      payload: (data: { code: string }) => data
    },
    search:{
      apiEndpoint: '/api/search',
      payload: (data: ModuleSearchRequest) => data
    }
  }
});