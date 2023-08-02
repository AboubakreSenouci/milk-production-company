import React from 'react';
import { HStack, Button, VStack, Box, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import Input from '../../../component/forms/Input'
import Select from '../../../component/forms/Select'



const validationSchema = yup.object().shape({
    disease: yup.string().oneOf(['Bluetongue', 'Botulism', 'Brucellosis'], 'Invalid option selected').required('strain is required'),
    examinationdate: yup.date().required('entry Date is required')
})



function Update({ showEditForm, row, onEdit }) {

    const handleSubmit = (values) => {
        onEdit(values);
        showEditForm(false);
    }

    return (
        <Box p='8'>
            <Heading as="h3" size="md" mb="6" color="#334E68">
                Update Examination
            </Heading>
            <Formik
                initialValues={row || { disease: '', examinationdate: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <VStack spacing={'4'}>
                            <Select label="Disease" name="disease" >
                                <option value="" selected disabled>Select Disease</option>
                                <option value="Bluetongue">Bluetongue</option>
                                <option value="Botulism">Botulism</option>
                                <option value="Brucellosis">Brucellosis</option>
                            </Select>
                            <Input label="Examinations Date" name="examinationdate" type="date" max={new Date().toISOString().split('T')[0]} />
                        </VStack>
                        <HStack justifyContent="flex-end" mt="6" gap='4'>
                            <Button colorScheme='red' onClick={() => showEditForm(false)}>Cancel</Button>
                            <Button type="submit" colorScheme='blue'>Submit</Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default Update;