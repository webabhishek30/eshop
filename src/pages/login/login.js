import { useNavigate } from "react-router-dom";
import { signInSchema } from '../../schema';
import { Container, Box, TextField, Button, Icon, Typography } from '@mui/material';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Lock  from '@mui/icons-material/Lock';


const initialValues = {
    email : "",
    password : ""
}

let token = window.sessionStorage.getItem('userDetail');

const Login = () => {

    let navigate = useNavigate();
    
   
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : signInSchema,
        onSubmit : async (values) => {
            try{
                let response = await fetch("http://localhost:8080/api/auth/signin",{
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "*/*",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username : values.email,
                        password : values.password
                    })
                });
                response = await response.json();
                console.log(response);
                window.sessionStorage.setItem('userDetail', JSON.stringify(response['token']));
                
                navigate('/');
                window.location.reload();
            }catch(error){
                alert(error.message);
            }
        }
    });

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Box className='icon'>
                    <Icon>
                        <Lock/>
                    </Icon>
                </Box>
                <Box mb={2}>
                    <Typography variant="h4" color="black" fontWeight="bold">
                        Sign in
                    </Typography>
                </Box>
                <Box component='form' onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField fullWidth type={'email'} name='email' variant="outlined" size="medium" label="Email Address *" value={values.email} onChange = {handleChange} onBlur = {handleBlur} className={errors.email && touched.email ? 'error' : ''}/>
                    </Box>
                    <Box mb={3}>
                        <TextField fullWidth variant="outlined" name='password' type={'password'} size="medium" label="Password *"  value={values.password}  onChange = {handleChange} onBlur = {handleBlur} className={errors.password && touched.password ? 'error' : ''} />
                    </Box>
                    <Box mb={3}>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Sign In</Button>
                    </Box>
                </Box>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </Box>
        </Container>  
    );
}

export { Login }