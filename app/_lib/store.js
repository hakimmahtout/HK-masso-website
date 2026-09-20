import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "@/app/_lib/features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
