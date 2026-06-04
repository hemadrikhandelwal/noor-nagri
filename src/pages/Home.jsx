import ProductCard from "@/components/ui/ProductCard";
import {getAllProducts} from "@/services/productservice";
import { useEffect, useState } from "react";

export default function Home(){
    const[products,setProducts] = useState([]); 
    const[isLoading,setLoading] = useState(true);
    const[isError, setError] = useState(null);
    const [searchProductName,setSearch] = useState('');

    const fetchProducts = async ()=>{
        try{
            const response = await getAllProducts('/products');
            setProducts(response.data.products);
            }
        catch(error){
                setError(error);
            }
        finally{
            setLoading(false)
        }
        }

    const filterProdcuts = products.filter((product) =>
            product.title.toLowerCase().includes(searchProductName.toLowerCase())
    );

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

         

        // if(showSearchUI){
        //     return  (
        //         <>
        //         <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
        //         {
        //             searchedProducts.map((product)=>{
        //             return <ProductCard key = {product.id} product = {product}/>})
        //         }
        //         </div>
        //         </>
        //     )
        
        
        // }

    return(
        <>
        <div className=" flex gap-4 w-full">

            <input
                type="text"
                value={searchProductName}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Product"
            />
            {/* <button onClick={searchProduct}>Search</button> */}

        </div>
       <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
        { filterProdcuts.length === 0 ? 
        (
             <p>No product found</p>
        ):
        (
            filterProdcuts.map((product)=>(
                <ProductCard key = {product.id} product = {product}/>

            ))

        ) }   

         

       </div>

       


       

           
            
        
        
        
        </>
    )
}