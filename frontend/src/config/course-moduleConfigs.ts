
interface CourseModuleConfig {
  apiEndpoint: string;
  cacheKey: string;
}
export const courseModuleConfigs = (code: string): Record<string, CourseModuleConfig> => ({
  course: {
    apiEndpoint: `/api/courses/${code}`,
    cacheKey: `course-${code}`
  },
  module: {
    apiEndpoint: `/api/modules/${code}`,
    cacheKey: `module-${code}`
  }
});