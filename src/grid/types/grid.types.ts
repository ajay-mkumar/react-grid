export type Column = {
  field: string;
  headerName: string;
  width?: string;
  minWidth?: string;
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  render?: (value: unknown) => React.ReactNode;
};

export type RowData = {
  [key: string]: unknown;
};

export type GridOptions = {
  overflow?: React.CSSProperties["overflow"];
  height?: string;
  width?: string;
  backgroundColor?: string;
};
