import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/admin-login',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/seller-login',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.get('/get-user',{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async(image ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.post('/profile-image-upload',image,{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 

export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try {
            console.log(info)
            const {data} = await api.post('/seller-register',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end method 

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.post('/profile-info-add',info,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 



    const returnRole = (token) => {
        if (token) {
           const decodeToken = jwtDecode(token)
           const expireTime = new Date(decodeToken.exp * 1000)
           if (new Date() > expireTime) {
             localStorage.removeItem('accessToken')
             return ''
           } else {
                return decodeToken.role
           }
            
        } else {
            return ''
        }
    }

    // end Method 

    export const logout = createAsyncThunk(
        'auth/logout',
        async({navigate,role},{rejectWithValue, fulfillWithValue, dispatch }) => {
             
            try {
                const {data} = await api.get('/logout', {withCredentials: true}) 
                localStorage.removeItem('accessToken') 
                if (role === 'admin') {
                    navigate('/admin/login')
                } else {
                    navigate('/login')
                }
                dispatch(clearUserData());
                return fulfillWithValue(data)
            } catch (error) {
                return rejectWithValue(error.response.data)
            }
        }
    )

        // end Method
        export const update_password = createAsyncThunk(
            'seller/update_password',
            async (passwordInfo, { rejectWithValue, fulfillWithValue }) => {
                try {
                    const { data } = await api.post('/update-password', passwordInfo, { withCredentials: true });
                    console.log('Data from API:', data); // In dữ liệu trả về từ API
                    return fulfillWithValue(data); 
                } catch (error) {
                    console.error('API error:', error);  // In lỗi chi tiết
                    if (error.response) {
                        console.error('Error Response:', error.response);  // In chi tiết lỗi từ server
                        return rejectWithValue(error.response.data);  // Trả về lỗi chi tiết
                    } else {
                        console.error('Error Message:', error.message);  // In lỗi không có response
                        return rejectWithValue(error.message);  // Trả về lỗi chung
                    }
                }
            }
        );
        
        
        

 
export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: {},
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        clearUserData: (state) => {
            state.token = null;
            state.role = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_login.pending, (state, { payload }) => {
            state.loader = true;
        }) 
        .addCase(seller_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_register.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_register.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(get_user_info.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
        })

        .addCase(profile_image_upload.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })

        .addCase(profile_info_add.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_info_add.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })
        .addCase(logout.pending, (state, { payload }) => {
            state.loader = true;
        }) 
        .addCase(logout.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(logout.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message          
        })
        .addCase(update_password.pending, (state) => {
            state.loader = true;
        })
        .addCase(update_password.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message; 
        })
        .addCase(update_password.rejected, (state, { payload }) => {
            state.loader = false; 
            state.errorMessage = payload.error; 
        });

        

    }

})
export const {messageClear,clearUserData} = authReducer.actions
export default authReducer.reducer