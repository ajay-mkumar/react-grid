export type Column = {
    field: string,
    headerName: string,
    sortable?: boolean
}

export type RowData = {
    [key: string]: unknown;
}