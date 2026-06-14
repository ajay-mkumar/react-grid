import { useMemo, useState } from "react";
import type { Column, GridOptions, RowData } from "../types/grid.types";
import Header from "./Header";
import Row from "./Row";

type GridProps = {
  columns: Column[];
  rows: RowData[];
  gridOptions: GridOptions;
};

function Grid({ columns, rows, gridOptions }: GridProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "dsc">("asc");
  const [filters, setFilterChange] = useState<Record<string, string>>({});
  const [gridColumns, setGridColummns] = useState(columns);
  const gridTemplateColumns = gridColumns
    .map((c) => c.width || "1fr")
    .join(" ");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "dsc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilter = (field: string, value: string) => {
    setFilterChange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const processedRows = useMemo(() => {
    let result = [...rows];

    // Filter
    result = result.filter((row) =>
      Object.entries(filters).every(([field, filterValue]) => {
        if (!filterValue) return true;

        return String(row[field])
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    );

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue === bValue) return 0;

        return sortDirection === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
    }

    return result;
  }, [rows, filters, sortField, sortDirection]);

  const startResize = (e: React.MouseEvent, field: string) => {
    const startX = e.clientX;

    const column = gridColumns.find((c) => c.field === field);

    const startWidth = parseInt(column?.width);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(80, startWidth + delta);

      setGridColummns((prev) =>
        prev.map((col) =>
          col.field === field
            ? {
                ...col,
                width: `${newWidth}px`,
              }
            : col
        )
      );
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="grid" style={{ ...gridOptions }}>
      <Header
        columns={gridColumns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        filters={filters}
        onFilterChange={handleFilter}
        gridTemplateColumns={gridTemplateColumns}
        startResize={startResize}
      />
      <Row
        rows={processedRows}
        columns={gridColumns}
        gridTemplateColumns={gridTemplateColumns}
      />
    </div>
  );
}

export default Grid;
