import React from 'react';
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Select from '../../../component/forms/Select';
import Input from '../../../component/forms/Input';

const initialValues = { strain: '', datebirth: '', gender: '' };
const validationSchema = yup.object().shape({
  datebirth: yup.date().required('Entry Date is required'),
  strain: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('Strain is required'),
  gender: yup.string().oneOf(['male', 'female'], 'Invalid option selected').required('Gender is required'),
});

export default function AddBirth({ setShowAddForm, handleAddBirth }) {
  const handleSubmit = (values) => {
    handleAddBirth(values);
    setShowAddForm(false);
  };

  return (
    <Box p="8">
      <Heading as="h3" size="md" mb="6" color="#334E68">
        Add New Birth
      </Heading>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <VStack spacing="4">
              <Select label="Cow strain" name="strain">
                <option value="" disabled>Select Cow Strain</option>
                <option value="holstein">Holstein</option>
                <option value="montbliard">Montbliard</option>
              </Select>
              <Select label="Cow gender" name="gender">
                <option value="" disabled>Select Cow Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <Input label="Birth Date" name="datebirth" type="date" max={new Date().toISOString().split('T')[0]} />
            </VStack>
            <HStack justifyContent="flex-end" mt="6">
              <Button colorScheme="red" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button type="submit" colorScheme='blue'>Submit</Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}


