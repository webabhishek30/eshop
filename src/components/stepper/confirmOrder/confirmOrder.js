import React,{useState, useEffect} from 'react';
import {Container, Box, Grid, Typography} from '@mui/material';

const ConfirmOrder = () => {

  const [addressDetail, setAddressDetail] = useState([]);

  let token = window.sessionStorage.getItem('userDetail');
  const productDetail = window.localStorage.getItem('productDetail');
  const addressId = window.localStorage.getItem('savedAddress');
  const savedProduct = JSON.parse(productDetail);
  
  console.log(addressId);

  useEffect(() => {
    if(token != null){
      const userDetail = async () => {
          let response = await fetch(`http://localhost:8080/api/addresses/${addressId}`, {
              method: 'GET',
              headers: {
                  "Content-Type" : "application/json",
                  "Accept" : "*/*",
                  Authorization : `Bearer ${JSON.parse(token)}`
              },
          });
          response = await response.json();
          setAddressDetail(response)
          console.log(addressDetail);
          
      }
      
      userDetail();
  }
  }, []);


  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box mb={1}>
              <Typography variant='h5'>
                {savedProduct.name}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography>
                Quantity : <Typography variant='span' fontWeight="bold">{savedProduct.quantity}</Typography>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography>
                Category : <Typography variant='span' fontWeight="bold">{savedProduct.category}</Typography>
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography>
                {savedProduct.description}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography color="red">
                Total Price : ₹ {savedProduct.price}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box mb={1}>
              <Typography variant='h5'>
                Address Details
              </Typography>
            </Box>
            <Typography>
              {addressDetail.name} <br /> 
              {addressDetail.street}, {addressDetail.landmark}, <br/> 
              {addressDetail.city}, {addressDetail.state}, {addressDetail.zipcode} 
            </Typography>
            
            
          </Grid>
        </Grid>
      </Box>
    </Container>
    
  )
}

export default ConfirmOrder;