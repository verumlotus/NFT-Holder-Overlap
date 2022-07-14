import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

export default function DataTable(props: {'intersectionName': string, 'dataForTable': {'id': string}[]}) {
    const columns: GridColDef[] = [
        { field: 'id', headerName: `Owner Address: ${props.intersectionName}`, width: window.innerWidth * .94},
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={props.dataForTable}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
        />
        </div>
    );
}
