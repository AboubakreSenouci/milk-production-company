import { React } from 'react';
import { useTable, usePagination } from 'react-table';
import { Table } from '@chakra-ui/table';
import { Box, IconButton, HStack, Button, Text, Flex, Select } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import TableHead from './Head';
import TableBody from './Body';



const CustomTable = ({ data, columns, onDelete, handleEdit }) => {


  const handleEditClick = (row) => { handleEdit(row) };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns, {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <HStack spacing='8px'>
            <IconButton size={'sm'} color={'blue.200'} icon={<EditIcon />}
              onClick={() => handleEditClick(row.original)}
            />
            <IconButton size={'sm'} color={'red.300'} icon={<DeleteIcon />}
              onClick={() => onDelete(row.original.id)}
            />
          </HStack>
        )
      }
    ])
  }

  const tableInstance = useTable({ columns, data }, tableHooks, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize
  } = tableInstance || {};


  const { pageIndex, pageSize } = state
  return (
    <Box>
      <Table rounded="md" {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody getTableBodyProps={getTableBodyProps} rows={page} prepareRow={prepareRow} />
      </Table>
      <Flex align={'center'} justify={'end'} p={'2'} gap={'2'} color={'#334E68'} >
        Page{' '}
        <Text>{pageIndex + 1} of {pageOptions.length}</Text>
        <Select maxW={'fit-content'} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [6,12,20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }
        </Select>
        <Button color={'#334E68'} onClick={() => gotoPage(0)} isDisabled={!canPreviousPage}>{"<<"}</Button>
        <Button color={'#334E68'} onClick={() => previousPage()} isDisabled={!canPreviousPage}>Previous</Button>
        <Button color={'#334E68'} onClick={() => nextPage()} isDisabled={!canNextPage}>Next</Button>
        <Button color={'#334E68'} onClick={() => gotoPage(pageCount-1)} isDisabled={!canNextPage}>{">>"}</Button>
      </Flex>
    </Box>
  );
}
export default CustomTable;
