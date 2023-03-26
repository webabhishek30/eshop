import {Card, CardMedia, CardContent, CardActions, Typography, Button, Box} from '@mui/material';
import { Link } from 'react-router-dom';

const Item = ({data}) => {

    const {id, imageUrl, name, price, description} = data;

    return (
        <Card variant="outlined">
            <CardMedia
                sx={{ height: 300 }}
                image={imageUrl}
                title={name}
            />
            <CardContent>
                <Box className="d-flex justify-content-between">
                    <Link to={`/product/${id}`} className='link'>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                    </Link>
                    <Typography gutterBottom variant="h6" component="div">
                        ₹ {price}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className='d-flex justify-content-between'>
                <Button size='small'>Buy</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export {Item};