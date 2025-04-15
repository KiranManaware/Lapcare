import axios from "axios";

const fetchComments=async(id,token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
   
    const response=await axios.get(`/api/complaints/${id}/comment`,options);
    return response.data;

    
}
const addComment=async(fromData,token)=>{
    const options={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
   
    const response=await axios.post(`/api/complaints/${fromData.id}/comment`,fromData,options);
    return response.data;


}

const commentService={fetchComments,addComment};

export default commentService;