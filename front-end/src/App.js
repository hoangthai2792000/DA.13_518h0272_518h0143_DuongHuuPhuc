import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Cart from './pages/CartPage';
import Products from './pages/ProductPage';
import Error from './pages/ErrorPage';
import SingleProduct from './pages/SingleProductPage';
import PrivateRoute from './pages/PrivateRoute';
import Checkout from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
function App() {
  return (
      <Router>
        <Navbar/>
        <Sidebar/>
        <Routes>
          <Route exact path='/' element={<Home/>}  />
          <Route exact path='/about' element={<About/>}  />
          <Route exact path='/cart' element={<CartPage/>}  />
          <Route exact path='/products' element={<Products/>}  />
          <Route path='*' element={<Error/>} />
        </Routes>
        
        <Footer/>
      </Router>
  );
}

export default App;
