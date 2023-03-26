import { useState } from "react";
import { signUpSchema } from "../../schema";
import { Box, TextField, Button, Icon, Container, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Lock  from '@mui/icons-material/Lock';

const initialValues = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    mobile: ""
}

const SignUp = () => {

    const [message, setMessage] = useState("");

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : signUpSchema,
        onSubmit : async (values) => {
            let response = await fetch("http://localhost:8080/api/auth/signup",{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "*/*"
                },
                body: JSON.stringify({
                    firstName : values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password, 
                    contactNumber: values.mobile
                })
            });
            response = await response.json();
            setMessage(response.message);
            console.log(response);
        }

    });

    console.log(message);
    

    return (
        <Container maxWidth='xs'>
            <Box mt={5}>
                <div>{message}</div>
                <Box mb={3} justifyContent="center">
                    <Icon>
                        <Lock/>
                    </Icon>
                </Box>
                <Box mb={2}>
                    <Typography variant="h4" color="black" fontWeight="bold">
                        Sign Up
                    </Typography>
                </Box>
                <Box component='form' onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField variant="outlined" size="medium" label="First Name *" name='firstName' fullWidth value={values.firstName} onChange={handleChange} onBlur={handleBlur}  className={errors.firstName && touched.firstName ? 'error' : ''}  />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Last Name *" name='lastName' fullWidth value={values.lastName}onChange={handleChange} onBlur={handleBlur}  className={errors.lastName && touched.lastName ? 'error' : ''}  />
                    </Box>
                    <Box mb={3}>
                        <TextField variant="outlined" size="medium" label="Email Address *" name='email' type={'email'} fullWidth value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Password *" name='password' type={'password'} fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Confirm Password *" name='confirmPassword' type={'password'} fullWidth value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}  className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}/>
                    </Box>
                    <Box mb={3}>
                        <TextField  variant="outlined" size="medium" label="Contact Number *" name='mobile' type={'number'} fullWidth onChange={handleChange} onBlur={handleBlur}  className={errors.mobile && touched.mobile ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Sign Up</Button>
                    </Box>
                </Box>
                <div className='text-right'>
                    <Link to="/login">Already have an account? Sign in</Link>
                </div>
            </Box>
        </Container>
    );
}

export { SignUp }