import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getAllProductById} from "@/services/productservice";


export default function ProductDetails(){

      let { id } = useParams();
      const[product,setProduct] = useState({});
      const [isError,setError] = useState(null);
      const[isLoading,setLoading] = useState(true)

      const fetchSingleProduct = async()=>{
        try{
            const response = await getAllProductById(`/products/${id}`);
            setProduct(response.data)
        }
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }
      }

      useEffect(()=>{
        fetchSingleProduct();
      },[id])

      if(isLoading){
        return <p> Loading.... </p>
      }

      if(isError){
        return<p> Error </p>
      }

    return(
        <>
        <h1 >Product details </h1>
        <div className="max-w-5xl mx-auto p-6">
  
  <div className="border rounded-2xl shadow-md p-6 grid md:grid-cols-2 gap-8 bg-white">

    {/* Left Section */}
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full rounded-xl object-cover"
      />
    </div>

    {/* Right Section */}
    <div className="flex flex-col gap-4">

      <h1 className="text-3xl font-bold">
        {product.title}
      </h1>

      <p className="text-gray-600">
        {product.description}
      </p>

      <p className="text-2xl font-semibold text-green-600">
        ${product.price}
      </p>

      <div className="space-y-1 text-sm text-gray-500">
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Rating: {product.rating}</p>
        <p>Stock: {product.stock}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Add to Cart
        </button>

        <button className="border border-black px-6 py-3 rounded-lg">
          Wishlist
        </button>
      </div>

    </div>
  </div>
</div>
        
        
        </>
    )
}