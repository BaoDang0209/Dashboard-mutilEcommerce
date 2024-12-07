import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const get_customer_request = createAsyncThunk(
    'customer/get_customer_request',
    async({ parPage,page,searchValue },{rejectWithValue, fulfillWithValue}) => {
        
        try {
             
            const {data} = await api.get(`/request-customer-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_customers = createAsyncThunk(
    'customer/get_customers',
    async({ parPage,page,searchValue },{rejectWithValue, fulfillWithValue}) => {
        
        try {
             
            const {data} = await api.get(`/get-customers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
           
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
);
export const get_customer = createAsyncThunk(
    'customer/get_customer',
    async(customerId ,{rejectWithValue, fulfillWithValue}) => {
        
        try {
             
            const {data} = await api.get(`/get-customer/${customerId}`,{withCredentials: true}) 
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
export const customerReducer = createSlice({
    name: 'customer',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        customers : [], 
        totalCustomer: 0,
        customer: ''
    },
    reducers : {

        messageClear : (state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder

        .addCase(get_customer_request.fulfilled, (state, { payload }) => {
            state.customers = payload.customers;
            state.totalCustomer = payload.totalCustomer; 
        })

        .addCase(get_customer.fulfilled, (state, { payload }) => {
            state.customer = payload.customer; 
        })  
        .addCase(get_customers.fulfilled, (state, { payload }) => {
            state.customers = payload.customers; 
            state.totalCustomer = payload.totalCustomer;
        })
        
 

    }

})
export const {messageClear} = customerReducer.actions
export default customerReducer.reducer