import { Link } from 'react-router-dom';

const ProductCard=({product})=>{
    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 h-48 sm:h-56">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col h-56">
                    
                    {/* Title */}
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-3 mb-2 group-hover:text-amber-600 transition-colors">
                        {product.title}
                    </h2>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between mt-auto">
                        <p className="text-lg sm:text-xl font-bold text-amber-600">
                            ${product.price}
                        </p>
                        {product.rating && (
                            <span className="text-sm text-gray-600">
                                ⭐ {product.rating.toFixed(1)}
                            </span>
                        )}
                    </div>

                    {/* CTA Button */}
                    <button className="mt-3 w-full bg-black hover:bg-gray-900 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200">
                        View Details
                    </button>
                </div>

            </div>
        </Link>
    )
}

export default ProductCard