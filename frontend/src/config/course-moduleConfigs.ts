
interface CourseModuleConfig {
  apiEndpoint: string;
  cacheKey: string;
}
export const courseModuleConfigs = (code: string): Record<string, CourseModuleConfig> => ({
  course: {
    apiEndpoint: `http://10.2.41.95:8081/api/courses/${code}`,
    cacheKey: `course-${code}`
  },
  module: {
    apiEndpoint: `http://10.2.41.95:8081/api/modules/${code}`,
    cacheKey: `module-${code}`
  }
});