import React from 'react'

import { Button, HStack, Box, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'

import Input from '../../../component/forms/Input'
import Select from '../../../component/forms/Select'

const initialValues = { disease: '', examinationdate: '' }
const validationSchema = yup.object().shape({
    examinationdate: yup.date().required('entry Date is required'),
    disease: yup.string().oneOf(['Bluetongue', 'Botulism', 'Brucellosis'], 'Invalid option selected').required('Disease is required')
})

function Add({ setShowAddForm, handleAddExam }) {

    const handleSubmit = (values) => {
        handleAddExam(values);
        setShowAddForm(false);
    };

    return (

        <Box p={'8'}>
            <Heading as="h3" size="md" mb="6" color="#334E68">
                Add New Examination
            </Heading>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    () => {
                        return (

                            <Form>
                                <Select label="Cow Disease " name="disease">
                                    <option value="" selected disabled>Select Disease</option>
                                    <option value="Bluetongue">Bluetongue</option>
                                    <option value="Botulism">Botulism</option>
                                    <option value="Brucellosis">Brucellosis</option>
                                </Select>
                                <Input label="Examinations Date" name="examinationdate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                <HStack justifyContent="flex-end" mt="6">
                                    <Button colorScheme='red' onClick={() => setShowAddForm(false)}>Cancel</Button>
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
export default Add;