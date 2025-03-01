import axios from "axios"

const fetchComplaints =async(token)=>{
    
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get('/api/complaints',options); 
    return response.data;
}

const fetchComplaint =async(token,id)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`/api/complaints/${id}`,options); 
    return response.data;
}

const addComplaint=async(formData,token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    console.log(formData)
    const response = await axios.post(`/api/complaints`,formData,options); 
    return response.data;
}

const updateComplaint=async(id,token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    console.log(id)
    const response = await axios.put(`/api/complaints/${id}`,{status:"close"},options); 
    return response.data;
}

const complaintService={fetchComplaints,fetchComplaint,addComplaint,updateComplaint};

export default  complaintService;
