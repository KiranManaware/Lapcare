import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import complaintService from "./complaintService";

const complaintSlice=createSlice({
    name:"complaint",
    initialState:{
        complaints:[],
        singleComplaint:{},
        isLoading:false,
        isSuccess:false,
        isError:false,
        message:"",
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getComplaints.pending,(state,action)=>{
            state.isLoading=true,
            state.isSuccess=false,
            state.isError=false
            
        })
        .addCase(getComplaints.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.isError=false,
            state.complaints=action.payload
    
        })
        .addCase(getComplaints.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            state.isError=true,
            state.message=action.payload
    
        })
        .addCase(getComplaint.pending,(state,action)=>{
            state.isLoading=true,
            state.isSuccess=false,
            state.isError=false
            
        })
        .addCase(getComplaint.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.isError=false,
            state.singleComplaint=action.payload
    
        })
        .addCase(getComplaint.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            state.isError=true,
            state.message=action.payload
    
        })
        .addCase(raiseComplaint.pending,(state,action)=>{
            state.isLoading=true,
            state.isSuccess=false,
            state.isError=false
            
        })
        .addCase(raiseComplaint.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.isError=false,
            state.complaints=[...state.complaints,action.payload]
    
        })
        .addCase(raiseComplaint.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            state.isError=true,
            state.message=action.payload
    
        })
        .addCase(closeComplaint.pending,(state,action)=>{
            state.isLoading=true,
            state.isSuccess=false,
            state.isError=false
            
        })
        .addCase(closeComplaint.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=true,
            state.isError=false,
            state.singleComplaint=action.payload
    
        })
        .addCase(closeComplaint.rejected,(state,action)=>{
            state.isLoading=false,
            state.isSuccess=false,
            state.isError=true,
            state.message=action.payload
    
        })
    }
});
export default  complaintSlice.reducer;


// thunk for all complaints
export const getComplaints=createAsyncThunk('FETCH/COMPLAINTS',async(_,thunkAPI)=>{

    const token= thunkAPI.getState().auth.user.token;
    try {
        return complaintService.fetchComplaints(token);
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
})

// thunk for  complaint
export const getComplaint=createAsyncThunk('FETCH/COMPLAINT',async(id,thunkAPI)=>{

    const token= thunkAPI.getState().auth.user.token;
    try {
        return complaintService.fetchComplaint(token,id);
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
})

// thunk for add complaint
export const raiseComplaint=createAsyncThunk('ADD/COMPLAINT',async(formData,thunkAPI)=>{

    const token= thunkAPI.getState().auth.user.token;
    try {
        return complaintService.addComplaint(formData,token);
    } catch (error) {
        const message = error.response.data.msg;
        
        return thunkAPI.rejectWithValue(message);
    }
})

// thunk for close complaint
export const closeComplaint=createAsyncThunk('CLOSE/COMPLAINT',async(id,thunkAPI)=>{

    const token= thunkAPI.getState().auth.user.token;
    try {
        return complaintService.updateComplaint(id,token);
    } catch (error) {
        const message = error.response.data.msg;
        
        return thunkAPI.rejectWithValue(message);
    }
})

