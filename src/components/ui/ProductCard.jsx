import { Link } from 'react-router-dom';

const ProductCard=({product})=>{

  
    
    return (
        <>
        <Link to={`/product/${product.id}`}>

         <div className="border rounded-xl p-4 shadow-md">
  
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full  object-cover rounded-lg"
            />

            <div className="mt-4">
                <h2 className="text-lg font-semibold">
                {product.title}
                </h2>

                <p className="text-gray-500 mt-1">
                ${product.price}
                </p>

                <span className="mt-4 w-full bg-black text-white py-2 rounded-lg block text-center" >
                View Details
                </span >
            </div>

            </div>
        </Link> 
           
        </>
    )
}

export default ProductCard