import axios from "axios"
import { API_URL } from "../../config";
const register=async(formData)=>{
    const response=await axios.post(`${API_URL}/api/user/register`,formData);
    localStorage.setItem('user',JSON.stringify(response.data));
    return response.data
}
const login=async(formData)=>{
    const response=await axios.post(`${API_URL}/api/user/login`,formData);
    localStorage.setItem('user',JSON.stringify(response.data));
    return response.data
}

const authService={register,login};

export default  authService;