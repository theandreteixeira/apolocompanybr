import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/auth/AuthPage'
import { Cart } from '../pages/cart/Cart'
import { Checkout } from '../pages/checkout/Checkout'
import { Description } from '../pages/description/Description'
import { Favourite } from '../pages/favourite/Favourite'
import { Footer } from '../pages/footer/Footer'
import { Home } from '../pages/home/Home'
import { Navbar } from '../pages/navbar/Navbar'
import { Order } from '../pages/orders/Order'
import { Products } from '../pages/products/Products'
import { ConfirmAccount } from '../pages/confirm-account/confirm-account'
import { Login } from '../pages/login/Login'
import { Logout } from '../pages/logout/Logout'
import { OrderMade } from '../pages/order-made/OrderMade'
import { Private } from './Private'
import { Public } from './Public'

export const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allProducts' element={<Products />} />
        <Route path='/men' element={<Products />} />
        <Route path='/women' element={<Products />} />
        <Route path='/kids' element={<Products />} />
        <Route path='/description' element={<Description />} />
        <Route
          path='/auth'
          element={
            <Public>
              <AuthPage />
            </Public>
          }
        />
        <Route
          path='/favourite'
          element={
            <Public>
              <Favourite />
            </Public>
          }
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route
          path='/orders'
          element={
            <Private path='/orders'>
              <Order />
            </Private>
          }
        />
        <Route
          path='/confirmAccount'
          element={
            <Public>
              <ConfirmAccount />
            </Public>
          }
        />
        <Route
          path='/logout'
          element={
            <Private>
              <Logout />
            </Private>
          }
        />
        <Route
          path='/login'
          element={
            <Public>
              <Login />
            </Public>
          }
        />
        <Route path='/orderMade' element={<OrderMade />} />
      </Routes>

      <Footer />
    </>
  )
}
