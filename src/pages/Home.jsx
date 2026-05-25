import ProductCard from "@/components/ui/ProductCard";
import fetchAllProducts from "@/services/productservice";
import { useEffect, useState } from "react";

export default function Home(){
    const[products,setProducts] = useState([]); 
    const[isLoading,setLoading] = useState(true);
    const[isError, setError] = useState(null);

    const fetchProducts = async ()=>{
        try{
            const response = await fetchAllProducts('/products');
            setProducts(response.data.products);
            }
        catch(error){
                setError(error);
            }
        finally{
            setLoading(false)
        }
        }

        useEffect(()=>{
            fetchProducts();
        },[]);

        if (isLoading) {
        return <p>Loading...</p>;
        }

        // Error UI
        if (isError) {
            return <p>Something went wrong!</p>;
        }

    return(
        <>
       <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">

         {
            products.map((product)=>{
                return <ProductCard key = {product.id} product = {product}/>

            })
        }

       </div>
       

           
            
        
        
        
        </>
    )
}