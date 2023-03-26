import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EshopApi } from "../../services/apiStorage";
import { Container, Box, Grid, CircularProgress, Typography, CardMedia, TextField, Button } from "@mui/material";
import Chip from '@mui/joy/Chip';

const Product = () => {
    const [loading, setLoading] = useState(true);
    const [singleProduct, setSingleProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const {productId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSingleProduct = async () => {
            setLoading(true);
            const product = await EshopApi.singleProductsApi(productId);
            setSingleProduct(product);
            setLoading(false);
        }
        fetchSingleProduct().catch(console.error);
    },[productId]);

    if(!loading && !singleProduct){
        return<>
            <div>Product Not Found</div>
        </>
    }

    const handlePrice = () => {
        
        let totalPrice = quantity * singleProduct.price;

        const currentProduct = {
            id: singleProduct.id,
            name : singleProduct.name,
            price : totalPrice,
            description : singleProduct.description,
            category : singleProduct.category,
            quantity : quantity,
            image: singleProduct.imageUrl
        }

        localStorage.setItem('productDetail', JSON.stringify(currentProduct));
        return navigate("/checkout")
    }

    return (
        <Container maxWidth="lg">
            <Box mt={10}>
                {loading ? 
                    (
                        <CircularProgress color="inherit" />
                        )
                    : 
                    (
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 390 }}
                                    image={singleProduct.imageUrl}
                                    alt={singleProduct.name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box className="d-flex justify-content-between align-items-center" mb={3}>
                                    <Typography variant="h4">
                                        {singleProduct.name}
                                    </Typography>
                                    <Chip>Available Quantity : {singleProduct.availableItems}</Chip>
                                </Box>

                                <Box mb={2}>
                                    <Typography>
                                        Categories:  <Typography variant="span" fontWeight="bold">{singleProduct.category}</Typography>
                                    </Typography>
                                </Box>

                                <Box mb={2}>
                                    <Typography>
                                        {singleProduct.description}
                                    </Typography>
                                </Box>
                                
                                <Box mb={2}>
                                    <Typography color="red" variant="h6" fontWeight="normal">
                                        ₹ {singleProduct.price}
                                    </Typography>
                                </Box>

                                <Box mb={2}>
                                    <TextField variant="outlined" label="Enter Quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                                </Box>

                                <Button variant="contained" onClick={handlePrice}>Place Order</Button>
                            </Grid>
                        </Grid>
                       )
                    
                }
                
            </Box>
        </Container>
    );
}

export { Product }