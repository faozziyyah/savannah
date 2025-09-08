//import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridRowsProp, GridColDef, GridPaginationModel, GridColumnVisibilityModel } from '@mui/x-data-grid';

type CustomDataTableProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
  rowCount: number;
  pageSizeOptions?: number[];
  paginationModel: GridPaginationModel;
  isLoading?: boolean;
  isError?: boolean;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  columnVisibilityModel?: GridColumnVisibilityModel;
  onColumnVisibilityModelChange?: (model: GridColumnVisibilityModel) => void;
};

const CustomDataTable = ({
    rows,
    columns,
    rowCount,
    pageSizeOptions = [5, 10, 1],
    paginationModel,
    isLoading = false,
    isError = false,
    onPaginationModelChange,
    columnVisibilityModel = undefined, 
    onColumnVisibilityModelChange = undefined,
    
}: CustomDataTableProps) => {
    return (
        <Paper className="w-full">
            {isLoading ? (
                <div className="m-8 text-center p-10">
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ padding: 2, textAlign: 'center' }}
                    >
                        Loading data, please wait...
                    </Typography>
                </div>
            ) : isError ? (
                <div className="m-8 text-center p-10">
                    <h2 className="text-lg font-semibold">Network Error</h2>
                    <p className="text-sm text-gray-500">
                        Please check your connection and try again.
                    </p>
                    <button
                        className="bg-primary-1 text-white border px-1 py-1 items-center rounded-[5px]"
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </button>
                </div>
            ) : !rows || rows.length === 0 ? (
                <div className="m-8 text-center p-10">
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ padding: 2, textAlign: 'center' }}
                    >
                        No data available.
                    </Typography>
                </div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <div className="min-w-full">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            paginationMode="server"
                            rowCount={rowCount}
                            paginationModel={paginationModel}
                            onPaginationModelChange={onPaginationModelChange}
                            pageSizeOptions={pageSizeOptions}
                            checkboxSelection
                            sx={{ 
                                border: 0, 
                                width: '100%',
                                minWidth: 'max-content',
                                '& .MuiDataGrid-root': {
                                    minWidth: 'max-content'
                                }
                            }}
                            loading={isLoading}
                            pagination
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={onColumnVisibilityModelChange}
                        />
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default CustomDataTable;
