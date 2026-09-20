import axios from "axios";
import { notFound } from "next/navigation";
// import { eachDayOfInterval } from "date-fns";

// await new Promise((res) => setTimeout(res, 10000));

export async function getAllServices({
  category,
  isFeatured,
  search,
  page = 1,
  limit = 10,
} = {}) {
  try {
    const params = {
      sort: "-ratingsAverage",
      page,
      limit,
    };

    if (search && search.trim()) {
      params.search = search.trim();
    }

    if (category && category !== "all") {
      params.category = category;
    }

    if (isFeatured === "true" || isFeatured === true) {
      params.isFeatured = true;
    }

    const { data } = await axios.get(
      "https://han-mass.onrender.com/api/v1/services",
      { params },
    );

    // await new Promise((res) => setTimeout(res, 10000));

    return { services: data.data.data, totalResults: data.totalResults };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch services",
    );
  }
}

export async function getMyBookings(email) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/bookings?email=${email}`,
    );

    return data.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create booking",
    );
  }
}

export async function getService(serviceId) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/services/${serviceId}`,
    );

    return data.data.data;
  } catch (error) {
    notFound();
  }
}

export async function getReview({ serviceId, workerId, guestId }) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/reviews?service=${serviceId}&worker=${workerId}&guest=${guestId}`,
    );

    return data.data.data;
  } catch (error) {
    notFound();
  }
}

export async function getAvailableWorkers(gender) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/bookings/available-workers?gender=${gender}`,
    );

    // await new Promise((res) => setTimeout(res, 10000));

    return data.data.workers;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch workers");
  }
}

export async function getAvailableDates({ workerId, duration }) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/bookings/available-dates?workerId=${workerId}&duration=${duration}`,
    );

    // await new Promise((res) => setTimeout(res, 10000));

    return data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch workers");
  }
}

export async function getAvailableTimes({ workerId, duration, date }) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/bookings/available-times?workerId=${workerId}&duration=${duration}&date=${date}`,
    );

    // await new Promise((res) => setTimeout(res, 10000));

    return data.availableTimes;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch workers");
  }
}

export async function getAllReviews() {
  try {
    const { data } = await axios.get(
      "https://han-mass.onrender.com/api/v1/reviews?sort=-rating",
    );

    return data.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function getGuest(email) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/guests/${email}`,
    );

    return data.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function getBooking(bookingId) {
  try {
    const { data } = await axios.get(
      `https://han-mass.onrender.com/api/v1/bookings/${bookingId}`,
    );

    // await new Promise((res) => setTimeout(res, 10000));

    return data.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create booking",
    );
  }
}

export async function createGuest(guestData) {
  try {
    const { data } = await axios.post(
      "https://han-mass.onrender.com/api/v1/guests",
      guestData,
    );

    return data.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function createBooking(bookingData) {
  try {
    const { data } = await axios.post(
      "https://han-mass.onrender.com/api/v1/bookings",
      bookingData,
    );

    return data.data.booking;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create booking",
    );
  }
}

export async function createReview(reviewData) {
  try {
    const { data } = await axios.post(
      "https://han-mass.onrender.com/api/v1/reviews",
      reviewData,
    );

    return data.data.review;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create review");
  }
}

export async function updateGuest(guestId, guestData) {
  try {
    const { data } = await axios.patch(
      `https://han-mass.onrender.com/api/v1/guests/${guestId}`,
      guestData,
    );

    return data.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function cancelBooking({ bookingId, guestEmail }) {
  try {
    const { data } = await axios.patch(
      `https://han-mass.onrender.com/api/v1/bookings/${bookingId}`,
      { guestEmail },
    );

    return data.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function deleteGuest(guestId) {
  try {
    await axios.delete(
      `https://han-mass.onrender.com/api/v1/guests/${guestId}`,
    );
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}
