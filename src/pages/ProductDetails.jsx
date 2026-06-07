import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getAllProductById} from "@/services/productservice";


export default function ProductDetails(){

      let { id } = useParams();
      const[product,setProduct] = useState({});
      const [isError,setError] = useState(null);
      const[isLoading,setLoading] = useState(true)
      const [ cart, setCart ] = useState([]);

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

      const updateCart = () =>{
        const existingItem = cart.find((item) =>item.id ===product.id)
        if(existingItem === undefined){
          setCart([...cart,{...product,quantity:1}])
        }
        else{
           const updatedCart = cart.map((item) => {
    if (item.id === product.id) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }

    return item;
  });

  setCart(updatedCart);
        }
      }

    

      useEffect(()=>{
        fetchSingleProduct();
      },[id])

      useEffect(()=>{
           console.log(cart,"cart");
      },[cart])

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
        <button className="bg-black text-white px-6 py-3 rounded-lg" onClick={(event)=>updateCart(event)}>
          Add to Cart
        </button>

        <button className="border border-black px-6 py-3 rounded-lg">
          Wishlist
        </button>
      </div>

    </div>
  </div>
</div>
    <Cart cart = {cart} setCart={setCart}/>
        </>

    )
}



const Cart =({cart, setCart}) =>{

  const removeItem=(itemId)=>{
    const updatedCart = cart.map((item)=>{
      if(item.id === itemId){
        return {...item, quantity: item.quantity - 1}
      }
      return item
    }).filter((item)=> item.quantity > 0)
    
    setCart(updatedCart)
  }


  return (
    <>
    {
      cart.map((item)=>{
        return(
          <>
          <div key={item.id}>{item.title} - {item.quantity}</div>
          <button  className="bg-black text-white px-6 py-3 rounded-lg" onClick={()=>removeItem(item.id)}>Remove Item</button>
          </>
         
        )
      })
    }</>
  )
 
}