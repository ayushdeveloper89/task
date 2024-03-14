import React, { useState, useEffect } from 'react';
import CustomForm from '../../Components/CustomForm/CustomForm';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    Stack,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [isAddOrRemoveRow, setIsAddOrRemoveRow] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {

    }, [isAddOrRemoveRow])

    const initialValues = {
        listItems: [{
            imageFile: '',
            title: '',
            description: '',
            quantity: '',
            price: '',
            date: '',
            isFirstTime: true
        }]
    }
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }
    const validationSchema = Yup.object().shape({
        initialValues: Yup.object().shape({
            listItems: Yup.array().of(
                Yup.object().shape({
                    imageFile: Yup
                        .mixed()
                        .required("Image is required")
                        .test("is-valid-type", "Not a valid image type",
                            value => isValidFileType(value && value.name.toLowerCase(), "image"))
                        .test("is-valid-size", "Max allowed size is 100KB",
                            value => value && value.size <= 102400000000),
                    title: Yup.string().max(25).required('Title is required'),
                    description: Yup.string().max(250).required('Description is required'),
                    quantity: Yup.number().required('Quantity is required'),
                    price: Yup.number().required('Price is required'),
                    date: Yup.string().required('Date is required'),
                })
            )
        })
    })



    const handleCustomSubmit = async (e, values) => {
        e.preventDefault();
        const formData = new FormData();
        values.initialValues.listItems.map((val) => {
            formData.append('imageFile', val.imageFile);
        })
        formData.append('itemConst', JSON.stringify(values.initialValues.listItems));
        try {
            const submitItems = await axios.post('/createItem', formData)
            navigate('/viewItemList')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='App'>
                <Formik
                    initialValues={{ initialValues }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        // values.contactInfo.state = selectedStateId;
                        try {
                            // setStatus({ success: false });
                            // setSubmitting(false);
                            // handleCustomSubmit(values)
                        } catch (err) {
                            // setStatus({ success: false });
                            // setErrors({ submit: err.message });
                            // setSubmitting(false);
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                        <form noValidate onSubmit={(e) => { e.preventDefault(); handleCustomSubmit(e, values) }} encType='multipart/form-data'>
                            <table>
                                <tbody>
                                    {values.initialValues.listItems.map((val, index) => {
                                        return (<CustomForm
                                            key={index}
                                            index={index}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            isSubmitting={isSubmitting}
                                            touched={touched}
                                            values={values}
                                            isAddOrRemoveRow={isAddOrRemoveRow}
                                            setIsAddOrRemoveRow={setIsAddOrRemoveRow}
                                        />)
                                    })}
                                </tbody>
                            </table>
                            <Button type="submit" disableElevation size="large" variant="contained" color="primary" sx={{ mt: 3 }} >
                                Save
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Form
