import Grid from "./grid/components/Grid";
import type { Column, GridOptions, RowData } from "./grid/types/grid.types";

const columns: Column[] = [
  { field: "id", headerName: "ID", width: "2fr" },
  { field: "name", headerName: "Name", width: "3fr" },
  { field: "role", headerName: "Role", width: "1fr" },
];

const rows: RowData[] = [
  { id: 1, name: "AJ", role: "Frontend Developer" },
  { id: 2, name: "Ravi", role: "Backend Developer" },
  { id: 3, name: "Tara", role: "QA Engineer" },
];

const gridOptions: GridOptions = {
  backgroundColor: ''
}

function App() {
  return <Grid columns={columns} rows={rows} gridOptions={gridOptions} />;
}

export default App;