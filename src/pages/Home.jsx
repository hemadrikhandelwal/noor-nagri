import ProductCard from "@/components/ui/ProductCard";
import {getAllProducts} from "@/services/productservice";
import { useEffect, useState } from "react";

export default function Home(){
    const[products,setProducts] = useState([]); 
    const[isLoading,setLoading] = useState(true);
    const[isError, setError] = useState(null);
    const [searchProductName,setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

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

    // const searchMatch =  products.filter((product) =>
    //         product.title.toLowerCase().includes(searchProductName.toLowerCase()));

    // const categoryMatch = products.filter((product)=>{
    //     product.category === selectedCategory
    // })
    // console.log(categoryMatch,searchMatch)



    const filterProdcuts = products.filter((product) =>{
        const searchMatch =  product.title.toLowerCase().includes(searchProductName.toLowerCase());
        const categoryMatch = 
        selectedCategory === 'all'? true:
        product.category === selectedCategory;
        return searchMatch && categoryMatch 
}) ;  
    
    const categories = [...new Set(products.map((product)=> product.category ))];

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
        <div className=" flex gap-4 w-full">

            <input
                type="text"
                value={searchProductName}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Product"
            />

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">All Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>


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