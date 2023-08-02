import React, { useEffect, useState } from 'react';
import { HStack, Button, VStack, Box, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import Input from '../../../component/forms/Input'
import Select from '../../../component/forms/Select'

const validationSchema = yup.object().shape({
    strain: yup.string().oneOf(['holstein', 'montbliard'], 'Invalid option selected').required('strain is required'),
    entrydate: yup.date().required('entry Date is required')
})


function Update({ setShowEditForm, row, onEdit }) {

    const handleSubmit = (values) => {
        onEdit(values);
        setShowEditForm(false);
    }


    return (
        <Box p='8'>
            <Heading as="h3" size="md" mb="6" color="#334E68">
                Update Cow
            </Heading>
            <Formik
                initialValues={row || { strain: '', entrydate: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (

                    <Form>
                        <VStack spacing={'4'}>
                            <Select label="Cow strain" name="strain" >
                                <option value="" disabled selected>Select Cow Strain</option>
                                <option value="holstein">Holstein</option>
                                <option value="montbliard">Montbliard</option>
                            </Select>
                            <Input label="Entry Date" name="entrydate" type="date" max={new Date().toISOString().split('T')[0]} />
                        </VStack>
                        <HStack justifyContent="flex-end" mt="6" gap='4'>
                            <Button colorScheme='red' onClick={() => setShowEditForm(false)}>Cancel</Button>
                            <Button type="submit" colorScheme='blue'>Submit</Button>
                        </HStack>
                    </Form>

                )}
            </Formik>
        </Box>
    );
}

export default Update;
