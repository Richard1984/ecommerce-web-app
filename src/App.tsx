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
import CategoryProductsRoute from './pages/category-products/CategoryProducts';
import EditProductRoute from './pages/edit-product/EditProduct';
import EditProfileRoute from './pages/edit-profile/EditProfile';
import EditShopRoute from './pages/edit-shop/EditShop';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import OrderDetail from './pages/order-detail/OrderDetail';
import Orders from './pages/orders/Orders';
import NewPaymentMethod from './pages/payment-mehods/NewPaymentMethod';
import PaymentMethods from './pages/payment-mehods/PaymentMethods';
import Payment from './pages/payment/Payment';
import ProductDetail from './pages/product-detail/ProductDetail';
import SearchRoute from './pages/search/Search';
import Shop from './pages/shop/Shop';
import ShoppingListProductsRoute from './pages/shopping-lists/pages/ShoppingListProducts/ShoppingListProducts';
import ShoppingListsRoute from './pages/shopping-lists/pages/ShoppingLists/ShoppingLists';
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
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PublicLayout />}>
            {/* PUBLIC PATHS */}
            <Route index element={<Home />} />
            <Route path="search" element={<SearchRoute />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="categories/:id/products" element={<CategoryProductsRoute />} />

            {/* LOGGED USER PATHS */}
            <Route path="account" element={<PrivateRoute/>}>
              <Route index element={<Account />} />
              <Route path="edit" element={<EditProfileRoute />} />
              <Route path="cart" element={<Cart />} />
              <Route path="lists">
                <Route path=":id/products" element={<ShoppingListProductsRoute />} />
                <Route index element={<ShoppingListsRoute />} />
              </Route>
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="payment_methods" element={<PaymentMethods />} />
              <Route path="payment_methods/new" element={<NewPaymentMethod />} />
            </Route>

            {/* LOGGED ADMIN PATHS */}
            <Route path="admin" element={<PrivateRoute hasAnyAuthorities={[UserRoleEnum.ADMIN]}/>}>
              <Route path="shop" element={<Shop />} />
              <Route path="shop/edit" element={<EditShopRoute />} />
              <Route path="products/new" element={<EditProductRoute />} />
              <Route path="products/:id/edit" element={<EditProductRoute />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Route>
          <Route path="payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
