const ProductCard=({product})=>{
    
    
    return (
        <>
            <div className="border rounded-xl p-4 shadow-md">
  
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-1/4 h-48 object-cover rounded-lg"
            />

            <div className="mt-4">
                <h2 className="text-lg font-semibold">
                {product.title}
                </h2>

                <p className="text-gray-500 mt-1">
                ${product.price}
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                View Details
                </button>
            </div>

            </div>
        </>
    )
}

export default ProductCard