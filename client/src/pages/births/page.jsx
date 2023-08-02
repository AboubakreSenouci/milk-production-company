import React, { useState } from 'react';
import CustomTable from '../../component/table/Table';
import { useQuery } from '@tanstack/react-query';
import Add from './forms/Add';
import Update from './forms/Update';
import BirthApi from '../../api/birth-api';
import { Heading, Flex, Button, Box, Text, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Loading from '../../component/loading/Loading';
import { showSuccessToast, showDeleteToast } from '../../utils/toastUtils';

function Births() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data, isLoading, refetch } = useQuery(['births'], async () => {
    const res = await (await fetch('http://127.0.0.1:5000/api/births')).json();
    return res.data;
  });

  if (isLoading) {
    return <Loading/>
  }
  
  const handleAddBirth = async (values) => {
    await BirthApi.addBirth(values);
    setShowAddForm(false);
    refetch();
    showSuccessToast('Added')
  };

  const handleEditBirth = (rowData) => {
    setSelectedRowData(rowData);
    setShowEditForm(true);
  };

  const onEdit = async (values) => {
    await BirthApi.updateBirth(values);
    refetch();
    showSuccessToast('Updated')
  };

  const onDelete = async (id) => {
    await BirthApi.deleteBirth(id);
    refetch();
    showDeleteToast();
  };

 

  const columns = [
    { Header: 'Strain', accessor: 'strain' },
    { Header: 'BirthDate', accessor: 'datebirth' },
    { Header: 'Gender', accessor: 'gender' },
  ];

  return (
    <Box p={{ md: '6' }}>
      <Heading as="h1" mb="10">
        <Flex justify="space-between">
          <Text color="#334E68">Births page</Text>
          <Button colorScheme="blue" leftIcon={<AddIcon w={3} h={3} />} onClick={() => setShowAddForm(true)}>
            Add Births
          </Button>
        </Flex>
      </Heading>
      <CustomTable data={data} columns={columns} onDelete={onDelete} handleEdit={handleEditBirth} />
      {showAddForm && (
        <Modal isOpen={showAddForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Add setShowAddForm={setShowAddForm} handleAddBirth={handleAddBirth} />
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

export default Births;
