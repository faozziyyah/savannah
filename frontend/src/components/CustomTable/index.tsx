import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from 'components/shadcn/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shadcn/ui/table';

type GenericTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  pageCount: number;
  isLoading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  emptyStateHeaderText?: string; // Optional header text
  emptyStateParagraphText?: string; // Optional paragraph text
  loadingStateText?: string; // Optional loading state text
  networkError?: boolean; // New prop for network error state
};

function GenericTable<T>({
  columns,
  data,
  pageCount,
  isLoading,
  onNextPage,
  onPreviousPage,
  canNextPage,
  canPreviousPage,
  emptyStateHeaderText = 'No Records Found', // Default header text
  emptyStateParagraphText = 'Try adjusting your filters or adding new data.', // Default paragraph text
  loadingStateText = 'Loading...', // Default loading state text
  networkError = false, // Default to false
}: GenericTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {loadingStateText}
                </TableCell>
              </TableRow>
             ) : networkError ? ( // Check for network error
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    <div className='m-8'>
                      <h2 className="text-lg font-semibold">Network Error</h2>
                      <p className="text-sm text-gray-500">Please check your connection and try again.</p>
                      <button className="bg-primary-1 text-white border px-1 py-1 items-center rounded-[5px]" onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                    </div>
                  </TableCell>
                </TableRow>
            ) : data?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <div className='m-8 ' >
                    <h2 className="text-lg font-semibold">{emptyStateHeaderText}</h2>
                    <p className="text-sm text-gray-500">{emptyStateParagraphText}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={onPreviousPage} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNextPage} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default GenericTable;


