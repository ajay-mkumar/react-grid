import { useState } from "react";
import type { Column, RowData } from "../types/grid.types";
import Cell from "./Cell";

type RowProps = {
  columns: Column[];
  rows: RowData[];
};

function Row({ rows, columns }: RowProps) {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  if (rows.length === 0) return <div className="grid-empty">No Rows</div>;
  return rows.map((row) => (
    <div
      onClick={() => setSelectedRowId(Number(row.id))}
      className={`grid-row ${selectedRowId === row.id ? "selected" : ""}`}
      key={String(row.id)}
    >
      <Cell row={row} columns={columns} />
    </div>
  ));
}

export default Row;
