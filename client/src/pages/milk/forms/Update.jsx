import React from 'react'

import { Box, Button, HStack, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'

import Input from '../../../component/forms/Input'


const validationSchema = yup.object().shape({
    date: yup.date().required('Date is required'),
    milkquantity: yup.number().required('Quantity is required')
})

export default function UpdateMilk({ setShowEditForm, onEdit, row }) {

    const handleSubmit = (values) => {
        onEdit(values);
        setShowEditForm(false);
    };

    return (
        <Box p='8'>
            <Heading as="h3" size="md" mb="6" color="#334E68">
                Update Milk
            </Heading>
            <Formik
                initialValues={row || { milkquantity: '', date: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    () => {
                        return (

                            <Form>
                                <Input label="Quantity" name="milkquantity" />
                                <Input label="Date" name="date" type="date" max={new Date().toISOString().split('T')[0]} />
                                <HStack justifyContent="flex-end" mt="6">
                                    <Button colorScheme='red' onClick={() => setShowEditForm(false)}>Cancel</Button>
                                    <Button type="submit" colorScheme='blue'>Submit</Button>
                                </HStack>
                            </Form>

                        )
                    }
                }
            </Formik>
        </Box>
    )
}