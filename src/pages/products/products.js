import {Box, Container, Grid, CircularProgress} from '@mui/material';
import { Item } from '../../components/Item';
import { EshopApi } from '../../services/apiStorage';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '../../components/categories';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [query, setQuery] = useSearchParams();

    const searchQuery = query.get('q');

    useEffect(() => {
        const fetchProdcts = async () => {
            setLoading(true);
            const products = searchQuery ? await EshopApi.searchProductsApi(searchQuery) : await EshopApi.allProductsApi();
            setProducts(products);
            setLoading(false);
        }
        fetchProdcts().catch(console.error);

    },[searchQuery]);

    const filterData = (category) => {

        if(category === 'All'){
            setProducts(products);
            return;
        }

        const updatedList = products.filter((currentElm) => {
            return currentElm.category === category;
        });
        setProducts(updatedList);
    }

    if(!loading && searchQuery && !products.length){
        return <>
            <div>
                No Product Found
            </div>
        </>
    }

    return (
        <Container maxWidth="lg">
            <Box mt={5}>

                <Box mb={3}>
                    <Categories filterData = {filterData} />
                </Box>

                <Grid container spacing={3}>
                    {loading ? 
                        (<CircularProgress color="inherit" />)
                        : 
                        (products.map((products) => {
                            return(
                                <Grid item xs={4} key={products.id}>
                                    <Item data={products} />
                                </Grid>
                            )
                        }))
                        
                    }
                </Grid>
                
            </Box>
        </Container>
    );
}

export { Products }