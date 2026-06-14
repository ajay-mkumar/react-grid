import type { Column, RowData } from "../types/grid.types";

type CellProps = {
  columns: Column[];
  row: RowData;
};

function Cell({ columns, row }: CellProps) {
  return (
    <>
      {columns.map((column) => {
        const value = row[column.field];

        return (
          <div className="grid-cell" key={column.field}>
            {String(value ?? "")}
          </div>
        );
      })}
    </>
  );
}

export default Cell;
