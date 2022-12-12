import { configureStore } from "@reduxjs/toolkit";

import { replys } from "../modules/replysSlice";

const store = configureStore({
  reducer: { replys, },
});

export default store;