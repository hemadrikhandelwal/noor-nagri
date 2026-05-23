import {  createBrowserRouter,RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import ProductDetails from "@/pages/ProductDetails";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/NotFound";

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



  
