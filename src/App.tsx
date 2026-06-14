import Grid from "./grid/components/Grid";
import type { Column, RowData } from "./grid/types/grid.types";

const columns: Column[] = [
  { field: "id", headerName: "ID", filterable: true },
  { field: "name", headerName: "Name", filterable: true },
  { field: "role", headerName: "Role" },
];

const rows: RowData[] = [
  { id: 1, name: "AJ", role: "Frontend Developer" },
  { id: 2, name: "Ravi", role: "Backend Developer" },
  { id: 3, name: "Tara", role: "QA Engineer" },
];

function App() {
  return <Grid columns={columns} rows={rows} />;
}

export default App;