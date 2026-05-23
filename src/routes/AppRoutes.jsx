import {  createBrowserRouter,RouterProvider } from "react-router-dom";
// import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";

const router = createBrowserRouter([

     {
        path:"/",
        element:<MainLayout />, 
        children:[
        {
        index:true,
        element:<Home/>
        },
        {
        path:"cart",
         element:<Cart /> 
     },
     {
        path:"products",
         element:<Products /> 
     },

      {
        path:"product/:id",
         element:<ProductDetails /> 
     },

      {
        path:"wishlist",
         element:<Wishlist /> 
     },
      {
        path:"*",
         element:<NotFound /> 
     },
      
      
      ]

     }


      

      


])

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;



  
