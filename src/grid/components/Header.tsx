import type { Column } from "../types/grid.types";


type HeaderProps = {
    columns: Column[];
  };

  
function Header({columns}: HeaderProps) {
  return (
    <div className="grid-header">
    {columns.map((column) => (
      <div key={column.field} className="grid-cell">
        {column.headerName}
      </div>
    ))}
  </div>
  );
}

export default Header;