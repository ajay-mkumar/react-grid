import type { Column } from "../types/grid.types";

type HeaderProps = {
  columns: Column[];
  sortField: string | null;
  sortDirection: "asc" | "dsc";
  onSort: (field: string) => void;
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  gridTemplateColumns: string;
  startResize: (e: React.MouseEvent, field: string) => void;
};

function Header({
  columns,
  sortDirection,
  sortField,
  onSort,
  filters,
  onFilterChange,
  gridTemplateColumns,
  startResize,
}: HeaderProps) {
  return (
    <div className="grid-header" style={{ gridTemplateColumns }}>
      {columns.map((column) => (
        <div
          key={column.field}
          onClick={() => {
            if (column.sortable) onSort(column.field);
          }}
          className="grid-cell"
        >
          <div className="header-cell">
            <span>
              {column.headerName}

              {column.sortable &&
                sortField === column.field &&
                (sortDirection === "asc" ? " ↑" : " ↓")}
            </span>

            <div
              className="resize-handle"
              onMouseDown={(e) => {
                e.stopPropagation();
                startResize(e, column.field);
              }}
            />
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
