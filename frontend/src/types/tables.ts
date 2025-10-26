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
  onLoadMore?: () => void; // Callback to load next page
  hasMore?: boolean; // Whether there are more pages to load
  isLoadingMore?: boolean; // Whether currently loading next page
}