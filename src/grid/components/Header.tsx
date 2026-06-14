import type { Column } from "../types/grid.types";

type HeaderProps = {
  columns: Column[];
  sortField: string | null;
  sortDirection: "asc" | "dsc";
  onSort: (field: string) => void;
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
};

function Header({
  columns,
  sortDirection,
  sortField,
  onSort,
  filters,
  onFilterChange,
}: HeaderProps) {
  return (
    <div className="grid-header">
      {columns.map((column) => (
        <div
          key={column.field}
          onClick={() => {
            if (column.sortable) onSort(column.field);
          }}
          className="grid-cell"
        >
          <div>
            {column.headerName}

            {column.sortable &&
              sortField === column.field &&
              (sortDirection === "asc" ? " ↑" : " ↓")}
          </div>
          {column.filterable && (
            <input
              type="text"
              onClick={(e) => e.stopPropagation()}
              value={filters[column.field] || ""}
              onChange={(e) => onFilterChange(column.field, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Header;
