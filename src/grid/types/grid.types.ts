export type Column = {
    field: string,
    headerName: string,
    sortable?: boolean,
    filterable?: boolean,
}

export type RowData = {
    [key: string]: unknown;
}