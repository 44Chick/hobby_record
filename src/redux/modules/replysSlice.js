import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const DB = process.env.React_APP_DBSERVER

const initialState = {
  replys: [],
  isLoading: false,
  error: null,
}

export const __getReplys = createAsyncThunk(
  "get.replys", // action value
  async (payload, thunkAPI) => {
    // 콜백 함수
    try {
      const data = await axios.get(`${DB}/replys`)
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const __deleteReplys = createAsyncThunk(
  "delete.replys",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${DB}/replys/${payload}`)
      return thunkAPI.fulfillWithValue("success")
    } catch {
      return thunkAPI.rejectWithValue("error")
    }
  }
)

export const replysSlice = createSlice({
  name: "replys",
  initialState,
  reducers: {
    addReply: (state, action) => {
      axios.post(`${DB}/replys`, action.payload)
    },
    deleteReply: (state, action) => {
      axios.delete(`${DB}/replys/${action.payload}`)
      // console.log(current(state.contents), action)
      state.contents = state.contents.filter((v) => v.id !== action.payload)
    },
  },
  extraReducers: {
    [__getReplys.pending]: (state) => {
      state.isLoading = true // 네트워크 요청이 시작되면 로딩상태를 true 로 변경
    },
    [__getReplys.fulfilled]: (state, action) => {
      state.isLoading = false // 네트워크 요청이 끝났으니, false로 변경
      state.replys = action.payload // store에 있는 replys에 서버에서 가져온 replys를 넣는다.
    },
    [__getReplys.rejected]: (state, action) => {
      state.isLoading = false // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload // catch 된 error 객체를 state.error에 넣는다.
    },
  },
})

export const { addReply, deleteReply } = replysSlice.actions
export default replysSlice.reducer
