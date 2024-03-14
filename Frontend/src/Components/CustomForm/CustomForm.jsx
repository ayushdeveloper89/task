import React, { useEffect, useState } from 'react';
import PreviewImage from '../PreviewImage/PreviewImage';
import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    Stack,
} from '@mui/material';

const CustomForm = (props) => {
    const index = props.index;
    const errors = props.errors;
    const handleBlur = props.handleBlur;
    const handleChange = props.handleChange;
    const isSubmitting = props.isSubmitting;
    const touched = props.touched;
    const values = props.values;
    const isAddOrRemoveRow= props.isAddOrRemoveRow;
    const setIsAddOrRemoveRow= props.setIsAddOrRemoveRow;

    const [imageChange, setImageChange] = useState(false);

    useEffect(() => {
       
    }, [imageChange])

    const handleAddRow = () => {
        values.initialValues.listItems.push({
            imageFile: '',
            title: '',
            description: '',
            quantity: '',
            price: '',
            date: '',
            isFirstTime: false
        })
        setIsAddOrRemoveRow(!isAddOrRemoveRow)
    }

    const handleRemoveRow = () => {
        values.initialValues.listItems.splice(index, 1)
        setIsAddOrRemoveRow(!isAddOrRemoveRow)
    }
    return (
        <tr className='singleRow '>
            <td className='singleCell imageFile'>
                {values.initialValues.listItems[index].imageFile ?
                    <PreviewImage width={150} height={75} file={values.initialValues.listItems[index].imageFile} />
                    : null}
                <TextField
                    // label="Image"
                    id="imageFile"
                    type="file"
                    // value={values.state}
                    name="imageFile"
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    inputProps={{accept:"image/png, image/jpeg, image/png"}}
                    onChange={(e) => { e.target.files.length !== 0 && (values.initialValues.listItems[index].imageFile = e.target.files[0]); e.target.files.length !== 0 && setImageChange(!imageChange) }}
                    // fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.imageFile && errors?.initialValues?.listItems[index]?.imageFile)}
                />
                {touched?.initialValues?.listItems[index]?.imageFile && errors?.initialValues?.listItems[index]?.imageFile && (
                    <FormHelperText error id="standard-weight-helper-text-imageFile">
                        {errors?.initialValues?.listItems[index]?.imageFile}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell'>
                <TextField
                    label="Title"
                    id="title"
                    type="text"
                    value={values.initialValues.listItems[index].title}
                    name={`initialValues.listItems[${index}].title`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.title && errors?.initialValues?.listItems[index]?.title)}
                />
                {touched?.initialValues?.listItems[index]?.title && errors?.initialValues?.listItems[index]?.title && (
                    <FormHelperText error id="standard-weight-helper-text-title">
                        {errors?.initialValues?.listItems[index]?.title}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell'>
                <TextField
                    label="Description"
                    id="description"
                    type="text"
                    value={values.initialValues.listItems[index].description}
                    name={`initialValues.listItems[${index}].description`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.description && errors?.initialValues?.listItems[index]?.description)}
                />
                {touched?.initialValues?.listItems[index]?.description && errors?.initialValues?.listItems[index]?.description && (
                    <FormHelperText error id="standard-weight-helper-text-description">
                        {errors?.initialValues?.listItems[index]?.description}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell quantity'>
                <TextField
                    label="Quantity"
                    id="quantity"
                    type="number"
                    value={values.initialValues.listItems[index].quantity}
                    name={`initialValues.listItems[${index}].quantity`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.quantity && errors?.initialValues?.listItems[index]?.quantity)}
                />
                {touched?.initialValues?.listItems[index]?.quantity && errors?.initialValues?.listItems[index]?.quantity && (
                    <FormHelperText error id="standard-weight-helper-text-quantity">
                        {errors?.initialValues?.listItems[index]?.quantity}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell price'>
                <TextField
                    label="Price"
                    id="price"
                    type="number"
                    value={values.initialValues.listItems[index].price}
                    name={`initialValues.listItems[${index}].price`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.price && errors?.initialValues?.listItems[index]?.price)}
                />
                {touched?.initialValues?.listItems[index]?.price && errors?.initialValues?.listItems[index]?.price && (
                    <FormHelperText error id="standard-weight-helper-text-price">
                        {errors?.initialValues?.listItems[index]?.price}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell'>
                <TextField
                    // label="Date"
                    id="date"
                    type="date"
                    value={values.initialValues.listItems[index].date}
                    name={`initialValues.listItems[${index}].date`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched?.initialValues?.listItems[index]?.date && errors?.initialValues?.listItems[index]?.date)}
                />
                {touched?.initialValues?.listItems[index]?.date && errors?.initialValues?.listItems[index]?.date && (
                    <FormHelperText error id="standard-weight-helper-text-date">
                        {errors?.initialValues?.listItems[index]?.date}
                    </FormHelperText>
                )}
            </td>
            <td className='singleCell'>
            {values.initialValues.listItems[index].isFirstTime ?
                <Button onClick={handleAddRow} disableElevation fullWidth size="large" variant="contained" color="primary" >
                    +
                </Button>
                : 
                <Button onClick={handleRemoveRow} disableElevation fullWidth size="large" variant="contained" color="primary" >
                    -
                </Button>}
            </td>
        </tr>
    )
}

export default CustomForm
