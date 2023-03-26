import './App.css';
import { Routes, Route, useNavigate, createSearchParams } from 'react-router-dom';
import { Products } from './pages/products';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { Product } from './pages/product';
import { Checkout } from './pages/checkout';
import { NotFound } from './pages/NotFound';
import { AddProduct } from './pages/addProduct';
import { Header } from './components/common/Header';

function App() {

  const navigate = useNavigate();

  const onSearch = (searchQuery) => {
    navigate(`/?${createSearchParams({q: searchQuery})}`)
  }

  return (
    <>
      <Header onSearch={onSearch} />
      <Routes>
        <Route path='/signUp' element = { <SignUp /> } />
        <Route path='/login' element = { <Login /> } />
        <Route path='/' element = { <Products/> } />
        <Route path='/product/:productId' element = { <Product /> } />
        <Route path='/checkout'  element = { <Checkout /> } />
        <Route path='/addProduct'  element = { <AddProduct /> } />
        <Route path='*' element = { <NotFound/> } />
      </Routes>
    </>
  );
}

export default App;
