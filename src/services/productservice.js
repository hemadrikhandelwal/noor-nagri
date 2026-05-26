import axios from "axios";

const Base_URL = 'https://dummyjson.com';

const apiClient = axios.create({
    baseURL:Base_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

const fetchAllProducts =(url,config ={})=>{
    return apiClient.get(url,config)
}

export default fetchAllProducts;