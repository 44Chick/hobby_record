import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import axios from "axios"

export const DB = process.env.React_APP_DBSERVER

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
  content: {},
  msg:"",
}

export const __getcontents = createAsyncThunk(
  "contents/get",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${DB}/contents`)
      return thunkAPI.fulfillWithValue(data.data)
    } catch (error) {
      // console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const __addcontents = createAsyncThunk(
  "contents/add",
  async (payload, thunkAPI) => {
    try {
      await axios.post(`${DB}/contents`, payload)
      return thunkAPI.fulfillWithValue("success")
    } catch (error) {
      return thunkAPI.rejectWithValue("error")
    }
  }
)


export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    addContent: (state, action) => {
      // console.log(state)
      axios.post(`${DB}/contents`, action.payload)
    },
    delContent: (state, action) => {
      axios.delete(`${DB}/contents/${action.payload}`)
      // console.log(current(state.contents), action)
      state.contents = state.contents.filter((v) => v.id !== action.payload)
    },
    updateContent: (state, action) => {
      axios.patch(`${DB}/contents/${action.payload}`)
      state.contents = action.payload
    },
    delContent2: (state, action) => {
      axios.delete(`${DB}/contents/${action.payload}`)
      state.contents = state.contents.filter((v) => v.id !== action.payload)

      console.log(current(state).contents)
      state.contents = current(state).contents
    },
  },
  extraReducers: (builder) =>{
    // [__getcontents.pending]: (state) => {
    //   state.isLoading = true // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    // },
    // [__getcontents.fulfilled]: (state, action) => {
    //   state.isLoading = false // 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.contents = action.payload // Store에 있는 contents에 서버에서 가져온 contents를 넣습니다.
    // },
    // [__getcontents.rejected]: (state, action) => {
    //   state.isLoading = false // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    //   state.error = action.payload // catch 된 error 객체를 state.error에 넣습니다.
    // },
    builder
      // getcontents reducer
      .addCase(__getcontents.pending, (state) => {
        state.isLoading = true // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
      })
      .addCase(__getcontents.fulfilled,(state, action) => {
        state.isLoading = false // 네트워크 요청이 끝났으니, false로 변경합니다.
        state.contents = action.payload // Store에 있는 contents에 서버에서 가져온 contents를 넣습니다.
      })
      .addCase(__getcontents.rejected,(state, action) => {
        state.isLoading = false // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
        state.error = action.payload // catch 된 error 객체를 state.error에 넣습니다.
      })
      // addcontents reducer
      .addCase(__addcontents.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(__addcontents.fulfilled,(state, action) => {
        state.isLoading = false 
        state.msg = action.payload
      })
      .addCase(__addcontents.rejected,(state, action) => {
        state.isLoading = false 
        state.msg = action.payload 
      })
  },
})

export const { addContent, delContent, delContent2, updateContent } =
  contentsSlice.actions
export default contentsSlice.reducer
