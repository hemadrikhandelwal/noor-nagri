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
        <h1>Product details </h1>
        <div className="border rounded-xl p-4 shadow-md">
            <h2>{product.title}</h2>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full  object-cover rounded-lg"
            />
            <p>{product.description}</p>
            <span>${product.price}</span>
            <p>{product.availabilityStatus}</p>
        </div>
        
        </>
    )
}