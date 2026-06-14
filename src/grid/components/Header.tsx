import type { Column } from "../types/grid.types";

type HeaderProps = {
  columns: Column[];
  sortField: string | null;
  sortDirection: "asc" | "dsc";
  onSort: (field: string) => void;
};

function Header({ columns, sortDirection, sortField, onSort }: HeaderProps) {
  return (
    <div className="grid-header">
      {columns.map((column) => (
        <div
          key={column.field}
          onClick={() => onSort(column.field)}
          className="grid-cell"
        >
          {column.headerName}

          {sortField === column.field &&
            (sortDirection === "asc" ? " ↑" : " ↓")}
        </div>
      ))}
    </div>
  );
}

export default Header;
