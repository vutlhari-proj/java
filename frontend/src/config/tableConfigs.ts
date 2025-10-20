interface TableColumn {
  key: string;
  header: string;
}

interface TableConfig {
  columns: TableColumn[];
  entityName: string;
  idKey: string;
  apiEndpoint: string;
  cacheKey: string;
}

export const tableConfigs: Record<string, TableConfig> = {
  courses: {
    columns: [
      { key: 'code', header: 'Course Code' },
      { key: 'courseName', header: 'Course Name' }
    ],
    entityName: 'course',
    idKey: 'code',
    apiEndpoint: '/api/courses',
    cacheKey: 'courses'
  },
  modules: {
    columns: [
      { key: 'code', header: 'Module Code' },
      { key: 'moduleName', header: 'Module Name' }
    ],
    entityName: 'module',
    idKey: 'code',
    apiEndpoint: '/api/modules',
    cacheKey: 'modules'
  }
};