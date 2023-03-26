import React, {useEffect, useState} from 'react';
import { Container, Box, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button } from '@mui/material';
import { addAddressSchema } from '../../../schema';
import { useFormik } from 'formik'; 

const initialValues = {
  name : '',
  contactNumber: '',
  city: '',
  landmark: '', 
  street: '',
  state: '',
  zipcode: '',
  user : ''
}

let token = window.sessionStorage.getItem('userDetail');

const SelectAddress = () => {

  const [addressList, setAddressList] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userId, setUserId] = useState('');

  

  useEffect(() => {
    if(token != null){
      const userDetail = async () => {
          let response = await fetch('http://localhost:8080/api/users', {
              method: 'GET',
              headers: {
                  "Content-Type" : "application/json",
                  "Accept" : "*/*",
                  Authorization : `Bearer ${JSON.parse(token)}`
              },
          });
          response = await response.json();
          response.map((item) => {
            // if(item?.roles[0]?.name === 'ADMIN'){
            //   
            // }
            setUserId(item.id);
          });
  
      }
      userDetail();
  }
  }, []);

  
  

  useEffect(() => {
    if(token != null){
      const userDetail = async () => {
          let response = await fetch('http://localhost:8080/api/addresses', {
              method: 'GET',
              headers: {
                  "Content-Type" : "application/json",
                  "Accept" : "*/*",
                  Authorization : `Bearer ${JSON.parse(token)}`
              },
          });
          response = await response.json();
          setUserAddress(response)
          // response.map((item) => {
          //   if(item.user != userId){
          //     setUserAddress(item)
          //   }
          // });
          
      }
      
      userDetail();
  }
  }, []);


  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : initialValues,
    validationSchema : addAddressSchema,
    onSubmit : async (values) => {
        let response = await fetch("http://localhost:8080/api/addresses",{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                Authorization : `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({
                name : values.name,
                contactNumber: values.mobile,
                city: values.city,
                landmark: values.landmark, 
                street: values.street,
                state: values.state,
                zipcode: values.zipcode,
                user : userId
            })
        });
        response = await response.json();
        setUserAddress(response);
    }
  });

  const selectAddress = (event) => {
    setAddressList(event.target.value)
    localStorage.setItem("savedAddress", event.target.value);
  };

  

  return <>
    <Container maxWidth="sm">
      <Box mt={5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={addressList}
            label="Select Address"
            onChange={selectAddress}>
              {
              userAddress.length > 0 ? userAddress?.map((item) => {
                return <MenuItem  keys={item} value={item.id}>{item.name} =: {item.street} - {item.city} - {item.state} - {item.zipcode}</MenuItem>
              }) : <MenuItem value="No Address Found">No Address Found</MenuItem>
            }
          </Select>
        </FormControl>
      </Box>
    </Container>
    <Box mt={2} mb={2}>
      <Typography sx={{textAlign : "center"}}>
        -OR-
      </Typography>
    </Box>
    <Box mb={2}>
      <Typography variant='h4' sx={{textAlign : "center"}}>
        Add Address
      </Typography>
    </Box>
    <Container maxWidth="xs">
      <Box component='form' onSubmit={handleSubmit}>
        <Box mb={3}>
            <TextField variant="outlined" size="medium" label="Name *" name='name' fullWidth value={values.name} onChange={handleChange} onBlur={handleBlur}  className={errors.name && touched.name ? 'error' : ''}  />
        </Box>
        <Box mb={3}>
            <TextField  variant="outlined" size="medium" label="Contact Number *" name='mobile' type={'number'} fullWidth onChange={handleChange} onBlur={handleBlur}  className={errors.mobile && touched.mobile ? 'error' : ''} />
        </Box>
        <Box mb={3}>
            <TextField  variant="outlined" size="medium" label="Street *" name='street' fullWidth value={values.street}onChange={handleChange} onBlur={handleBlur}  className={errors.street && touched.street ? 'error' : ''}  />
        </Box>
        <Box mb={3}>
            <TextField  variant="outlined" size="medium" label="City *" name='city' fullWidth value={values.city}onChange={handleChange} onBlur={handleBlur}  className={errors.city && touched.city ? 'error' : ''}  />
        </Box>
        <Box mb={3}>
            <TextField variant="outlined" size="medium" label="State *" name='state' fullWidth value={values.state} onChange={handleChange} onBlur={handleBlur} className={errors.state && touched.state ? 'error' : ''} />
        </Box>
        <Box mb={3}>
            <TextField variant="outlined" size="medium" label="Landmark" name='landmark' fullWidth value={values.landmark} onChange={handleChange} onBlur={handleBlur} />
        </Box>
        <Box mb={3}>
            <TextField  variant="outlined" size="medium" label="Zipcode *" name='zipcode' fullWidth value={values.zipcode} onChange={handleChange} onBlur={handleBlur} className={errors.zipcode && touched.zipcode ? 'error' : ''} />
        </Box>
        
        <Box mb={3}>
            <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Save Address</Button>
        </Box>
      </Box>
    </Container>
  </>
}

export default SelectAddress ;