import { useMemo, useState } from "react";
import type { Column, RowData } from "../types/grid.types";
import Header from "./Header";
import Row from "./Row";

type GridProps = {
  columns: Column[];
  rows: RowData[];
};

function Grid({ columns, rows }: GridProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "dsc">("asc");
  const [filters, setFilterChange] = useState<Record<string, string>>({});
console.log(filters)
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "dsc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilter = (field: string, value: string) => {
    setFilterChange(prev =>( {
        ...prev,
        [field]: value
    }))
  }

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


  return (
    <div className="grid">
      <Header
        columns={columns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        filters={filters}
        onFilterChange={handleFilter}
      />
      <Row rows={processedRows} columns={columns} />
    </div>
  );
}

export default Grid;
