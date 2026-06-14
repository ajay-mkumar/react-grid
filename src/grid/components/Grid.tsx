import type { Column, RowData } from "../types/grid.types";
import Header from "./Header";
import Row from "./Row";

type GridProps = {
    columns: Column[],
    rows: RowData[]
}

function Grid({ columns, rows }: GridProps) {
  return (
    <div className="grid">
      <Header columns={columns} />
      <Row rows={rows} columns={columns} />
    </div>
  );
}

export default Grid;
