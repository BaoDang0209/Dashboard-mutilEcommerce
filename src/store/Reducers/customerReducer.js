import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 


export const get_customers = createAsyncThunk(
    'customer/get_customers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/customer/get-customers`, { withCredentials: true });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const customerReducer = createSlice({
    name: 'customer',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        customers : [], 
        totalCustomer: 0,
    },
    reducers : {

        messageClear : (state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
          
        .addCase(get_customers.pending, (state) => {
            state.loader = true;
        })
        .addCase(get_customers.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.customers = payload.customers; 
            state.totalCustomer = payload.totalCustomer;
        })
        .addCase(get_customers.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error || "Failed to fetch customers";
        });
        
 

    }

})
export const {messageClear} = customerReducer.actions
export default customerReducer.reducer