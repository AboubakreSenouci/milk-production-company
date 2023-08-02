import React from 'react';
import { HStack, Button, VStack, Box, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import Input from '../../../component/forms/Input'
import Select from '../../../component/forms/Select'



const initialValues = { strain: '', entrydate: '' }
const validationSchema = yup.object().shape({
    strain: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('strain is required'),
    entrydate: yup.date().required('entry Date is required')
})


function Add({ setShowAddForm, handleAddCow }) {

    const handleSubmit = (values) => {
        handleAddCow(values);
    };

    return (
        <Box p='8'>
            <Heading as="h3" size="md" mb="6" color="#334E68">
                Add New Cow
            </Heading>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <VStack spacing={'4'}>
                            <Select label="Cow strain" name="strain" value="holstein">
                                <option value="" disabled selected>Select Cow Strain</option>
                                <option value="holstein">Holstein</option>
                                <option value="montbliard">Montbliard</option>
                            </Select>
                            <Input label="Entry Date" name="entrydate" type="date" max={new Date().toISOString().split('T')[0]} />
                        </VStack>
                        <HStack justifyContent="flex-end" mt="6" gap='4'>
                            <Button colorScheme='red' onClick={() => setShowAddForm(false)}>Cancel</Button>
                            <Button type="submit" colorScheme='blue'>Submit</Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Add;
