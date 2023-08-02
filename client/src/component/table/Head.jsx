import React from 'react';
import { Thead,Tr, Th } from '@chakra-ui/table';


const TableHead = ({ headerGroups }) => {
    return (
      <Thead>
        {headerGroups.map((headerGroup, key) => (
          <Tr key={key} {...headerGroup.getHeaderGroupProps()} borderBottom="6px" borderColor="gray.500">
            {headerGroup.headers.map((column, index) => (
              <Th key={index} {...column.getHeaderProps()} fontWeight="medium" fontSize="xs" color="gray.700">
                {column.render('Header')}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
    );
};
export default TableHead;