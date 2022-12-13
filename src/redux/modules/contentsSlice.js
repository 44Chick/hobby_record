import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const DB = process.env.React_APP_DBSERVER

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
}

export const __getcontents = createAsyncThunk(
  "contents",
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

export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: {
    [__getcontents.pending]: (state) => {
      state.isLoading = true // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getcontents.fulfilled]: (state, action) => {
      state.isLoading = false // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.contents = action.payload // Store에 있는 contents에 서버에서 가져온 contents를 넣습니다.
    },
    [__getcontents.rejected]: (state, action) => {
      state.isLoading = false // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
})

export const {} = contentsSlice.actions
export default contentsSlice.reducer
