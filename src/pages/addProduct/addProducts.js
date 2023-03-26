import { useState } from "react";
import { Box, Button, FormControl, MenuItem, Select, InputLabel, TextField, Container, Typography } from '@mui/material';
import { addProductSchema } from '../../schema';
import { useFormik } from 'formik';

const initialValues = {
    name : "",
    category : "",
    manufacturer : "",
    availableItem : "",
    price : "",
    imageUrl: "",
    description: ""
}

let token = window.sessionStorage.getItem('userDetail');

const AddProduct = () => {

    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("");

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : addProductSchema,
        onSubmit : async (values) => {
            let response = await fetch("http://localhost:8080/api/products",{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "*/*",
                    Authorization : "Bearer " + JSON.parse(token)
                },
                body: JSON.stringify({
                    name : values.name,
                    category: values.category,
                    manufacturer: values.manufacturer,
                    availableItems: values.availableItem, 
                    price: values.price,
                    imageUrl: values.imageUrl,
                    description: values.description
                })
            });
            response = await response.json();
            setMessage(response.message);
            console.log(response);
            
        }

    });


    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <div>{message}</div>
                <Box mb={2}>
                    <Typography variant="h4" color="black" fontWeight="bold">
                        Add Product
                    </Typography>
                </Box>
                <Box  component='form' onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField variant="outlined" size="medium" label="Name *" name='name' fullWidth value={values.name} onChange={handleChange} onBlur={handleBlur}  className={errors.name && touched.name ? 'error' : ''}  />
                    </Box>
                    <Box mb={3}>
                        <FormControl fullWidth>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="demo-simple-select"
                                name='category'
                                value={values.category} onChange={handleChange} onBlur={handleBlur}  className={errors.category && touched.category ? 'error' : ''}
                                label="Category"
                                >
                                <MenuItem value={'Apparel'}>Apparel</MenuItem>
                                <MenuItem value={'Electronic'}>Electronic</MenuItem>
                                <MenuItem value={'Personal Care'}>Personal Care</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mb={3}>
                        <TextField variant="outlined" size="medium" label="Manufacturer *" name='manufacturer' fullWidth value={values.manufacturer} onChange={handleChange} onBlur={handleBlur} className={errors.manufacturer && touched.manufacturer ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Available Item *" name='availableItem' fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.availableItem && touched.availableItem ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Price *" name='price' fullWidth value={values.price} onChange={handleChange} onBlur={handleBlur}  className={errors.price && touched.price ? 'error' : ''}/>
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Image Url" name='imageUrl' fullWidth onChange={handleChange} onBlur={handleBlur}  className={errors.imageUrl && touched.imageUrl ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Product Description" name='description' fullWidth onChange={handleChange} onBlur={handleBlur} />
                    </Box>
                    <Box mb={3}>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Add Product</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export { AddProduct }