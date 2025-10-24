export interface TableColumn {
  key: string;
  header: string;
}

export interface TableData {
  [key: string]: unknown;
}

export interface GenericTableProps {
  data: TableData[];
  columns: TableColumn[];
  entityName: "module" | "course" | string; // "course" or "module"
  idKey: string; // "code" for courses, and modules
}