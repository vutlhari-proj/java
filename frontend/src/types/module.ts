import type { ShortCourseProp } from "./course";

export interface ModuleProp {
  code: string;
  moduleName: string; 
}

export interface ModuleExtendedProp extends ModuleProp {
  type: string;
  nqf_level: number;
  credits: number;
  prerequisites: ModuleProp[];
  courses: ShortCourseProp[];
}

export interface ModuleRequest extends ModuleProp {
  type: string;
  nqf_level: number;
  credits: number;
  prerequisites: string[];
  courseCodes: string[];
}

interface ModuleOperationConfig<T = unknown> {
  apiEndpoint: string;
  payload?: (data: T) => T;
}

interface ModuleConfig {
  post: ModuleOperationConfig<ModuleExtendedProp>;
  put: ModuleOperationConfig<ModuleExtendedProp>;
  delete: ModuleOperationConfig<{ code: string }>;
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
    }
  }
});