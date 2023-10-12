import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import { AuthProvider } from "./Components/Context/authuntication";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ForgetPassword from "./Components/Forget-Password/ForgetPassword";
import VerifyCode from "./Components/Verify-Code/VerifyCode";
import ResetPassword from "./Components/Reset-Password/ResetPassword";
import Wishlist from "./Components/Wishlist/Wishlist";

function App() {

  
  const queryClient=new QueryClient()

const router= createBrowserRouter([
  {
path:"/", element:<Layout/>,children:[
  {index:true,element:<Products/>},

{path:"/products",element:<Products/>},

{path:"/brands",element:<Brands/>},

{path:"/cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},

{path:"/categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:"/wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},

{path:"/forget-password",element:<ForgetPassword/>},
{path:"/verify-code",element:<VerifyCode/>},
{path:"/reset-password",element:<ResetPassword/>},


{path:"/register",element:<Register/>},

{path:"/login",element:<Login/>},
{path:"*",element:<NotFound/>}
]
}

])
  return <>

<QueryClientProvider client={queryClient}>
<AuthProvider>
<RouterProvider router={router}>
  <Layout/>
</RouterProvider>
</AuthProvider>
</QueryClientProvider>
  </>;
}

export default App;
