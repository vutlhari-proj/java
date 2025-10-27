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
  pages?: (index: number, size: number) => string;
}

export const tableConfigs: Record<string, TableConfig> = {
  courses: {
    columns: [
      { key: "code", header: "Course Code" },
      { key: "courseName", header: "Course Name" },
    ],
    entityName: "course",
    idKey: "code",
    apiEndpoint: "/api/courses",
    cacheKey: "courses",
    pages: (index: number, size: number) => `/api/courses?page=${index}&size=${size}`,
  },
  modules: {
    columns: [
      { key: "code", header: "Module Code" },
      { key: "moduleName", header: "Module Name" },
    ],
    entityName: "module",
    idKey: "code",
    apiEndpoint: "/api/modules",
    cacheKey: "modules",
    pages: (index: number, size: number) => `/api/modules?page=${index}&size=${size}`,
  },
};
