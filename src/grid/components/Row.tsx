import type { Column, RowData } from "../types/grid.types";
import Cell from "./Cell";


type RowProps = {
    columns: Column[],
    rows: RowData[]
}

function Row({ rows, columns }: RowProps) {
  return rows.map((row) => (
    <div className="grid-row" key={String(row.id)}>
      <Cell row={row} columns={columns} />
    </div>
  ));
}

export default Row;
