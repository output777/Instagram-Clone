import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie"
// import dotenv from "dotenv";
// dotenv.config();

const cookies = new Cookies();
// 13.124.0.25 현욱님 ip
const API_BASE = 'http://43.200.171.29:8080/api'
// const API_BASE = 'http://13.124.0.25/api'

// const API_BASE = process.env.REACT_APP_INSTAS_API_URL
console.log('API_BASE', API_BASE);
console.log(API_BASE)

const initialState = {
    instas: [],
    insta: null,
    isLoading: false,
    error: null,
};

export const __getInstas = createAsyncThunk("instas/getInstas", async (payload, thunkAPI) => {
    try {
        // const data = await axios.get("http://localhost:3001/instas")
        const data = await axios.get(`${API_BASE}/boards`)
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});


export const __getDetailInsta = createAsyncThunk("instas/getDetailInstas", async (payload, thunkAPI) => {
    try {
        const data = await axios.get(`${API_BASE}/boards/details/${payload}`)
        console.log(data.data)
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
});


export const __postInstas = createAsyncThunk("instas/postInstas", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        const accessToken = cookies.get("accessToken");

        const config = {
            headers: {
                "Content-type": false, responseType: 'blob',
                Authorization: `Bearer ${accessToken}`
            },
        }
        const data = await axios.post(`${API_BASE}/board/write`, payload, config)
        console.log('data', data)
        // thunkAPI.dispatch(__getInstas());
        return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
        console.log('error', error)
        return thunkAPI.rejectWithValue(error);
    }
});

export const __deleteInsta = createAsyncThunk("instas/__deleteInsta", async (payload, thunkAPI) => {
    try {
        const accessToken = cookies.get("accessToken");

        const config = {
            headers: {
                "Content-type": false, responseType: 'blob',
                Authorization: `Bearer ${accessToken}`
            },
        }
        const data = await axios.delete(`${API_BASE}/board/details/${payload}`, config)
        console.log('data', data);
        cookies.remove('boardId');
        return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
})


export const __putInsta = createAsyncThunk("instas/__putInsta", async (payload, thunkAPI) => {
    console.log('payload', payload)
    try {
        console.log('boardId', cookies.get('boardId'))
        const accessToken = cookies.get("accessToken");

        const config = {
            headers: {
                "Content-type": 'application/json', responseType: 'blob',
                Authorization: `Bearer ${accessToken}`
            },
        }
        const data = await axios.put(`${API_BASE}/board/details/${cookies.get('boardId')}`, payload, config)
        console.log('data', data);
        cookies.remove('boardId');
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
        console.log('error', error);
        return thunkAPI.rejectWithValue(error);
    }
})




export const __getComments = createAsyncThunk("insta/getComments", async (payload, thunkAPI) => {
    console.log('payload', payload);
    try {
        const data = await axios.get(`${API_BASE}/boards/details/${payload}`);
        console.log('commentList', data.data.result.data.commentList);
        return thunkAPI.fulfillWithValue(data.data.result);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const __postComments = createAsyncThunk("insta/postComments", async (payload, thunkAPI) => {

    console.log('payload', payload)
    try {
        // const accessToken = cookies.get("Authorization");
        const accessToken = cookies.get("accessToken");
        const config = {
            headers: {
                "Content-type": "application/json",
                // "Content-type": false, responseType: 'blob',
                Authorization: `Bearer ${accessToken}`
            },
        }
        const data = await axios.post(`${API_BASE}/board/details/${payload.boardId}`, payload.content, config);
        // return thunkAPI.fulfillWithValue(payload);
        console.log('data', data)
        return thunkAPI.fulfillWithValue(data.data.result);
        // return thunkAPI.fulfillWithValue(data.data.result.data.commentList);
    } catch (error) {
        console.log(error, error)
        return thunkAPI.rejectWithValue("ERROR=>", error);
    }
});

export const InstaSlice = createSlice({
    name: "instas",
    initialState,
    reducers: {},
    extraReducers: {
        [__getInstas.pending]: (state) => {
            state.isLoading = true;
        },
        [__getInstas.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.instas = action.payload;
        },
        [__getInstas.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__getDetailInsta.pending]: (state) => {
            state.isLoading = true;
        },
        [__getDetailInsta.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.insta = action.payload;
        },
        [__getDetailInsta.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__postInstas.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__postInstas.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            console.log(action.payload);
            state.instas.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__postInstas.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },

        [__deleteInsta.pending]: (state) => {
            state.isLoading = true;
        },
        [__deleteInsta.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log('action.payload', action.payload)
            state.instas = state.instas.filter((data) => data.boardId !== action.payload);
        },
        [__deleteInsta.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },


        [__putInsta.pending]: (state) => {
            state.isLoading = true;
        },
        [__putInsta.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log('action.payload', action.payload)
            // state.instas = state.instas.filter((data) => data.boardId !== action.payload);
        },
        [__putInsta.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__getComments.pending]: (state) => {
            state.isLoading = true;
        },
        [__getComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.insta = action.payload;
        },
        [__getComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__postComments.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__postComments.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            console.log('action.payload', action.payload)
            state.insta.data.commentList.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__postComments.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    }
})

export const { } = InstaSlice.actions;
export default InstaSlice.reducer;
