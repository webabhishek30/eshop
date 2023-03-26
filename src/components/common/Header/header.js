import React, {useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import { Icon } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {Link, useNavigate} from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

const token = window.sessionStorage.getItem('userDetail');

const Header = ({onSearch}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState("");

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
                    if(item?.roles[0]?.name === 'ADMIN'){
                        setRole(item?.roles[0]?.name);
                    }
                });
        
            }
            userDetail();
        }
    }, []);

    console.log(`Role : ${role}`  );

    const handleSearchQuery = () => {
        if(searchQuery.trim().length){
            return onSearch(searchQuery.trim());
        }
        setSearchQuery('');
    }

    let navigate = useNavigate();
    const sessionOut = () => {
        window.sessionStorage.clear();
        window.location.reload();
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar className="justify-content-between align-items-center">
                    <div className="d-flex">
                        <Box mr={2}>
                            <Icon>
                                <ShoppingCartIcon/>
                            </Icon>
                        </Box>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            upGrad E-Shop
                        </Typography>
                    </div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                        <Button variant="plain" color="Neutral" onClick={handleSearchQuery}>Search</Button>
                    </Search>

                    {
                        token == null ? <Box sx={{display : "flex"}}>
                        <Box mr={2}>
                            <Link className="link" to='/login'>Login</Link>
                        </Box>
                        <Box ml={2}>
                            <Link className="link" to='/signUp'>SingUp</Link>
                        </Box>
                    </Box> : <Box sx={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                        <Box mr={2}>
                            <Link className="link" to='/'>Home</Link>
                        </Box>
                        {
                            role === 'ADMIN' ? 
                                <Box ml={2}>
                                    <Link className="link" to='/addProduct'>Add Product</Link>
                                </Box> : ''
                        }
                        <Box ml={2}>
                            <Button variant="solid" size="sm" color="danger" onClick={sessionOut}>Logout</Button>
                        </Box>
                    </Box> 
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export { Header }