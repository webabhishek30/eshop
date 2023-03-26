import { ButtonGroup, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { EshopApi } from '../../services/apiStorage';

const Categories = ({filterData, menuType}) => {

    const [categories, setCategories] = useState([]);

    const newCategories = ["All", ...new Set(categories.map((category) => {
        return category;
    }))]

    useEffect(() => {
        const fetchAllCategories = async () => {
            const categories = await EshopApi.allProductsCategoriesApi();
            setCategories(categories);
        } 
        fetchAllCategories();
    },[])

    return <>
        <Container maxWidth="xs">
            <ButtonGroup>
                {
                    newCategories.map((categories) => {
                        return <Button key={categories} onClick={() => filterData(categories)}>{categories}</Button>
                    })
                }
            </ButtonGroup>
        </Container>
    </>
}

export {Categories};