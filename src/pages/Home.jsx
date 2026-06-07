import ProductCard from "@/components/ui/ProductCard";
import {getAllProducts} from "@/services/productservice";
import { useEffect, useState } from "react";

export default function Home(){
    const[products,setProducts] = useState([]); 
    const[isLoading,setLoading] = useState(true);
    const[isError, setError] = useState(null);
    const [searchProductName,setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectSort, setSelectSort] = useState('default');

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
    const sortOptions = [
  { value: "lowToHigh", label: "Price: Low to High" },
  { value: "highToLow", label: "Price: High to Low" }
];


    const filterProdcuts = products.filter((product) =>{
        const searchMatch =  product.title.toLowerCase().includes(searchProductName.toLowerCase());
        const categoryMatch = 
        selectedCategory === 'all'? true:
        product.category === selectedCategory;
        return searchMatch && categoryMatch 
}) ;  

    const sortedProduct = [...filterProdcuts];

        if(selectSort === 'lowToHigh'){
             sortedProduct.sort((a,b)=>a.price-b.price)
        }

        if(selectSort === 'highToLow'){
                 sortedProduct.sort((a,b)=>b.price-a.price)
        }
    
    const categories = [...new Set(products.map((product)=> product.category ))];

    useEffect(()=>{
            fetchProducts();
        },[]);

        if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="text-center">
                    <div className="inline-block">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                    </div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">Loading products...</p>
                </div>
            </div>
        );
        }

        // Error UI
        if (isError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="text-center max-w-md">
                        <div className="text-5xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                        <p className="text-gray-600 mb-6">We encountered an error while loading the products. Please try again.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }


    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-gray-600 text-lg">Discover our premium selection of products</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Search & Filter Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Search Products
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchProductName}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by product name..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Dropdown */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                SortBy
                            </label>
                            <select 
                                value={selectSort} 
                                onChange={(e) => setSelectSort(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white cursor-pointer"
                            >
                                <option value="default">Default</option>
                                {sortOptions.map((sortOption) => (
                                    <option key={sortOption.value} value={sortOption.value}>{sortOption.label}</option>
                                ))}
                            </select>

                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filterProdcuts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> products
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        { filterProdcuts.length === 0 ? 
        (
             <div className="col-span-full text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
        ):
        (
            sortedProduct.map((product)=>(
                <ProductCard key = {product.id} {...product}/>

            ))

        ) }   
       </div>
            </div>
        </div>
    )
}