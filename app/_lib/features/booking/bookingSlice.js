import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: null,
  duration: null,
  worker: null,
  date: "",
  startTime: "",
  guestDetails: {
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    notes: "",
  },
  step: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,

  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    setWorker: (state, action) => {
      state.worker = action.payload;
    },

    setDate: (state, action) => {
      state.date = action.payload;
    },

    setTime: (state, action) => {
      state.startTime = action.payload;
    },

    setGuestDetails: (state, action) => {
      state.guestDetails = {
        ...state.guestDetails,
        ...action.payload,
      };
    },

    nextStep: (state) => {
      if (state.step < 5) state.step += 1;
    },

    prevStep: (state) => {
      if (state.step > 0) state.step -= 1;
    },

    setStep: (state, action) => {
      state.step = action.payload;
    },

    resetBooking: () => initialState,
  },
});

export const {
  setService,
  setDuration,
  setWorker,
  setDate,
  setTime,
  setGuestDetails,
  nextStep,
  prevStep,
  setStep,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
