import { useState, useEffect, useMemo } from 'react'
import { fetchAllUsersWithPagination } from '../../services';
import { Link, useNavigate } from 'react-router-dom';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/shadcn/ui/table';
import Loader from '../../components/Loaders/loader';
import { Button } from '../../components/shadcn/ui/button';


export type users = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export type usertable = {
  items: [],
  user: users
};

type PaginationModel = {
  page: number;
  pageSize: number;
  currentPage: number;
};

const UsersTable = () => {
    
    const [data, setData] = useState<users[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false); 
    const [dataCount, setDataCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState<PaginationModel>({ pageSize: 4, page: 0, currentPage: 1 });
    const [pageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

      const fetchData = async () => {

        setIsLoading(true);
        setNetworkError(false);

        try {

          const response = await fetchAllUsersWithPagination({
           // pageIndex: paginationModel.page,
           // pageSize: paginationModel.pageSize,
           // currentPage: paginationModel.currentPage,
            pageIndex: currentPage,
            pageSize: pageSize,
            currentPage: currentPage, 
          });

          //console.log(response)

          setData(response);
          setDataCount(response.count);
          setHasNextPage(!!response.next);
          setHasPreviousPage(!!response.previous);
        } catch (error) {
          console.error('Error Fetching Data', error);
          setNetworkError(true);

        } finally {
          setIsLoading(false);
        }

      };

      fetchData();
    }, [pageIndex, pageSize, currentPage, paginationModel]);
    console.log(data)

    const pagination = useMemo(
      () => ({
        pageIndex,
        pageSize,
      }),
      [pageIndex, pageSize],
    );

    const columns: ColumnDef<users>[] = [
        {
          id: 'name',
          header: 'Full Name',
          cell: ({ row }) => <Link to={`/users/${row.original.id}`}>
                <div className='capitalize'>{row.original.name}</div>
            </Link>,
        },
        {
          id: 'email',
          header: ' Email Address',
          cell: ({ row }) => <Link to={`/users/${row.original.id}`}>
                <div className='capitalize'>{row.original.email}</div>
            </Link>,
        },
        {
          id: 'email',
          header: 'Address',
          cell: ({ row }) => <Link to={`/users/${row.original.id}`}>
                <div className='capitalize'>{row.original.email}</div>
            </Link>,
        },
    ];

    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection,
        pagination,
      },
    });

  return (

    <div className='flex flex-col gap-12 w-[80%] m-auto'>

        <h1 className='mt-8 font-semibold text-4xl'>Users</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='mx-auto max-w-[90vw] overflow-x-scroll rounded-lg border border-gray-300 bg-white px-2  py-4 md:max-w-[95vw] lg:mx-0 lg:max-w-full'>
              
              <Table className=''>
                
                <TableHeader className='border-0 [&_tr]:border-b-0 border-b-gray-300'>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className='border-0'>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className='border-0'>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className='border-t-0 border-t-gray-300'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                           
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (

                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-[400px] text-center'>
                        <div>
                          <p className='text-base font-semibold text-gray-500'>No Records</p>
                          <p className='text-sm leading-6 tracking-normal text-gray-400'>
                            {/* Create a patient to populate list */}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                </TableBody>

              </Table>

            </div>

            <div className='flex items-center justify-end space-x-2 py-4'>
              
              <div className='space-x-2'>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    table.previousPage(), setCurrentPage(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                  // disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => { 
                    table.nextPage(), 
                    setCurrentPage(currentPage + 1);
                  }}
                  disabled={!hasNextPage}
                >
                  Next
                </Button>
              </div>

            </div>

          </>
        )}

    </div>
  )
}

export default UsersTable