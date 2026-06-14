import { useState } from "react";
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "dsc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedRows = [...rows];

  if (sortField) {
    sortedRows.sort((a, b) => {
      const aValue = a[sortField];
      const bvalue = b[sortField];

      if (sortDirection === "asc") {
        return aValue > bvalue ? 1 : -1;
      }

      return aValue < bvalue ? 1 : -1;
    });
  }

  return (
    <div className="grid">
      <Header
        columns={columns}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <Row rows={sortedRows} columns={columns} />
    </div>
  );
}

export default Grid;
