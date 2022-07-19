import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import { useAppDispatch } from './config/store';
import PublicLayout from './layout/PublicLayout/PublicLayout';
import Account from './pages/account/Account';
import Cart from './pages/cart/Cart';
import Categories from './pages/categories/Categories';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import OrderDetail from './pages/order-detail/OrderDetail';
import Orders from './pages/orders/Orders';
import PaymentMethods from './pages/payment-mehods/PaymentMethods';
import Payment from './pages/payment/Payment';
import ProductDetail from './pages/product-detail/ProductDetail';
import Search from './pages/search/Search';
import Shop from './pages/shop/Shop';
import SignUp from './pages/signup/Signup';
import { getAccount } from './reducers/authentication';
import UserRoleEnum from './shared/enums/role.enum';
import PrivateRoute from './shared/utils/private-route';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccount());
  }, []);


  return (
    <div className="App">
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
        style={{ "zIndex": "100001" }}
        autoClose={1000}
        limit={3}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/cart" element={<Cart />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/orders/:id" element={<OrderDetail />} />
          <Route path="/account/payment_methods" element={<PaymentMethods />} />
          <Route path="/admin/shop" element={<PrivateRoute hasAnyAuthorities={[UserRoleEnum.ADMIN]}><Shop /></PrivateRoute>} />
          <Route path="/admin/categories" element={<PrivateRoute hasAnyAuthorities={[UserRoleEnum.ADMIN]}><Categories /></PrivateRoute>} />
        </Route>
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
