import React, {useState, useEffect} from 'react';
import { Grid, CardMedia, Box, Container, Typography } from '@mui/material';

const OrderedItem = () => {
    const [productOrdered, setProductOrdered] = useState([]);
    

    useEffect(() => {
        const product = window.localStorage.getItem('productDetail');
        setProductOrdered(JSON.parse(product));
    }, [])


    return (
        <Container maxWidth="md">
            <Box mt={5}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CardMedia
                            sx={{ height: 300 }}
                            image={productOrdered.image}
                            title={productOrdered.name}
                            component = 'img'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box mb={3}>
                            <Typography variant="h4">
                                {productOrdered.name}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography>
                                Quantity:  <Typography variant="span" fontWeight="bold">{productOrdered.quantity}</Typography>
                            </Typography>
                        </Box>

                        <Box mb={2}>
                            <Typography>
                                Categories:  <Typography variant="span" fontWeight="bold">{productOrdered.category}</Typography>
                            </Typography>
                        </Box>

                        <Box mb={2}>
                            <Typography>
                                {productOrdered.description}
                            </Typography>
                        </Box>
                        
                        <Box mb={2}>
                            <Typography color="red" variant="h6" fontWeight="normal">
                                Total Price : ₹ {productOrdered.price}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default OrderedItem ;