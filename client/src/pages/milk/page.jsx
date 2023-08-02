import React, { useState } from 'react';
import CustomTable from '../../component/table/Table';
import { Heading, Flex, Button, Box, Text, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import MilkApi from '../../api/milk-api';
import { AddIcon } from '@chakra-ui/icons';
import Add from './forms/Add';
import Update from './forms/Update';
import Loading from '../../component/loading/Loading';
import { showSuccessToast } from '../../utils/toastUtils';

function Milk() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const { data, isLoading, refetch } = useQuery(['milk'], async () => {
    const res = await (await fetch('http://127.0.0.1:5000/api/milk')).json();
    return res.data;
  });

  if (isLoading) {
    return <Loading/>
  }

  const onDelete = async (id) => {
    await MilkApi.deleteMilk(id);
    refetch();
  };

  const onEdit = async (values) => {
    await MilkApi.updateMilk(values);
    refetch();
    showSuccessToast('Updated')
  };

  const handleEditMilk = (rowData) => {
    setSelectedRowData(rowData);
    setShowEditForm(true);
  };

  const handleAddMilk = async (values) => {
    await MilkApi.addMilk(values);
    setShowAddForm(false);
    refetch();
    showSuccessToast('Added')
  };

  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'MilkQuantity(liter)', accessor: 'milkquantity' },
  ];

  return (
    <Box p={{ md: '6' }}>
      <Heading as="h1" mb="10">
        <Flex justify="space-between">
          <Text color="#334E68">Milk page</Text>
          <Button
            colorScheme="blue"
            leftIcon={<AddIcon w={3} h={3} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Milk
          </Button>
        </Flex>
      </Heading>
      <CustomTable data={data} columns={columns} onDelete={onDelete} handleEdit={handleEditMilk} />
      {showAddForm && (
        <Modal isOpen={showAddForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Add setShowAddForm={setShowAddForm} handleAddCMilk={handleAddMilk} />
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

export default Milk;
