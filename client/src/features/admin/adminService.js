import axios from "axios";
import { API_URL } from "../../config";

const fetchAllUsers=async(token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(`${API_URL}/api/admin/users`,options);
    console.log(response.data)
    return response.data
}

const fetchAllComplaints=async(token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(`${API_URL}/api/admin/complaints`,options);    
    return response.data
}

const fetchAllComments=async(token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(`${API_URL}/api/admin/comments`,options);    
    return response.data
}

const updateComplaint=async()=>{
    console.log("Complaint Updated")
}

const adminService={fetchAllUsers,fetchAllComplaints,updateComplaint,fetchAllComments};

export default adminService;