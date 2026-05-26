import axios from "axios";

const Base_URL = 'https://dummyjson.com';

const apiClient = axios.create({
    baseURL:Base_URL,
    headers:{
        'Content-Type':'application/json'
    }
});

const getAllProducts =(url,config ={})=>{
    return apiClient.get(url,config)
}

const getAllProductById = (url,config ={})=>{
    return apiClient.get(url,config)
}

export  {getAllProducts,getAllProductById};