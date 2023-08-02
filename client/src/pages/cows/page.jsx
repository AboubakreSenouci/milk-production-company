import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heading, Flex, Button, Box, Text, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CustomTable from '../../component/table/Table';
import AddCows from './forms/Add';
import Update from './forms/Update';
import CowApi from '../../api/cow-api';
import Loading from '../../component/loading/Loading'
import { showSuccessToast, showDeleteToast } from '../../utils/toastUtils';

function Cows() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  

  const { data, isLoading, refetch } = useQuery(
    ['cows'],
    async () => {
      const res = await (await fetch('http://127.0.0.1:5000/api/cows')).json();
      return res.data;
    }
  );

  if (isLoading) {
    return <Loading/>
  }

  const onDelete = async (id) => {
    await CowApi.deleteCow(id);
    refetch();
    showDeleteToast();
  };

  const onEdit = async (values) => {
    await CowApi.updateCow(values);
    refetch();
    showSuccessToast('Updated');
  };

  const handleEditCow = (rowData) => {
    setSelectedRowData(rowData);
    setShowEditForm(true);
  };

  const handleAddCow = async (values) => {
    await CowApi.addCow(values);
    refetch();
    setShowAddForm(false);
    showSuccessToast('added');
  };

  const columns = [
    { Header: 'Strain', accessor: 'strain' },
    { Header: 'EntryDate', accessor: 'entrydate' },
  ];

  return (
    <Box p={{ md: '6' }}>
      <Heading as="h1" mb="10">
        <Flex justify="space-between">
          <Text color="#334E68">Cows page</Text>
          <Button colorScheme="blue" leftIcon={<AddIcon w={3} h={3} />} onClick={() => setShowAddForm(true)}>
            Add cow
          </Button>
        </Flex>
      </Heading>
      <CustomTable data={data} columns={columns} onDelete={onDelete} handleEdit={handleEditCow} />
      {showAddForm && (
        <Modal isOpen={showAddForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <AddCows setShowAddForm={setShowAddForm} handleAddCow={handleAddCow} />
          </ModalContent>
        </Modal>
      )}
      {showEditForm && (
        <Modal isOpen={showEditForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Update setShowEditForm={setShowEditForm} row={selectedRowData} onEdit={onEdit} />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default Cows;
