import './index.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'

// Pages
import Dashboard from './pages/Dashboard'
import CartPage from './pages/user/cart/CartPage'

// Layouts
import { UserLayout, AdminLayout } from './components/layout/Layout'

// Auth Pages
import AuthLayout from './auth/AuthLayout'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import ForgotPassword from './auth/ForgotPassword'
import LoginWithMobile from './auth/LoginWithMobile'
import AdminDashboard from './pages/admin/AdminDashboard'
import FavouriteList from './pages/user/favourite/FavouriteList'
// import useAuth from './hooks/useAuth';
import ProtectedRoute from './components/layout/ProtectedRoute'
import PageNotFound from './components/layout/PageNotFound'
import ProductDetails from './pages/user/product/ProductDetails'
import { useAuthContext } from './hooks/AuthContext'
import OrderList from './pages/user/orders/OrderList'
import AccountLayout from './components/layout/AccountLayout'
import ProfilePage from './pages/user/account/ProfilePage'
import AddressPage from './pages/user/account/AddressPage'
import Notifications from './pages/user/account/Notifications'
import { Toaster } from 'react-hot-toast'
import UserList from './pages/admin/user/UserList'
import CategoryList from './pages/admin/category/CategoryList'
import SubCategoryList from './pages/admin/category/SubCategoryList'
import ProductList from './pages/admin/product/ProductList'
import ProductForm from './pages/admin/product/ProductForm'
import AdminProductDetails from './pages/admin/product/AdminProductDetails'
import AdminProfilePage from './pages/admin/admin-profile/AdminProfilePage'
import UserCollection from './pages/user/collection/UserCollection'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Checkout from './pages/user/cart/Checkout'


function App () {
  const { isAuthenticated } = useAuthContext()

  return (
    <>
      <Toaster />
      <Routes>
        {/* User Layout - Public Routes */}
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='collection' element={<UserCollection />} />
          <Route
            path='cart'
            element={
              <CartPage
                
              />
            }
          />
          <Route
            path='checkout'
            element={
              <Checkout
                
              />
            }
          />
          <Route
            path='product-details/:productId'
            element={
                <ProductDetails />
            }
          />
          <Route
            path='account'
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                allowedRoles={['user', 'admin']}
                redirectPath='/auth/signin'
              >
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path='wishlist' element={<FavouriteList />} />
            <Route path='addresses' element={<AddressPage />} />
            <Route path='notifications' element={<Notifications />} />
          </Route>

          <Route
            path='orders'
            element={
              <ProtectedRoute
                isAllowed={isAuthenticated}
                allowedRoles={['user', 'admin']}
                redirectPath='/auth/signin'
              >
                <OrderList />
              </ProtectedRoute>
            }
          />

          {/* Auth Pages */}
          <Route path='auth' element={<AuthLayout />}>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='otp-login' element={<LoginWithMobile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute
              isAllowed={isAuthenticated}
              allowedRoles={['admin']}
              redirectPath='/auth/signin'
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path='users' element={<UserList />} />
          <Route path='category' element={<CategoryList />} />
          <Route
            path='sub-category/:categoryId'
            element={<SubCategoryList />}
          />
          <Route path='products' element={<ProductList />} />
          <Route path='account' element={<AdminProfilePage />} />
          <Route path='add-product' element={<ProductForm />} />
          <Route path='update-product/:productId' element={<ProductForm />} />
          <Route
            path='product-info/:productId'
            element={<AdminProductDetails />}
          />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
