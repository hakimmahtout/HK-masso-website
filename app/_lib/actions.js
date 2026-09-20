"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  cancelBooking,
  createBooking,
  createReview,
  deleteGuest,
  updateGuest,
} from "@/app/_lib/data-service";

export async function signInWithGoogleAction() {
  await signIn("google", { redirectTo: "/reservation" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const name = formData.get("name");
  const gender = formData.get("gender");

  const updateData = { name, gender };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/profile");
}

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.guestId) {
    throw new Error("You must be logged in");
  }

  await deleteGuest(session.user.guestId);

  await signOut({ redirectTo: "/" });
}

export async function createReservation(bookingData) {
  const session = await auth();

  if (!session?.user) {
    redirect(
      `/booking/error?message=${encodeURIComponent("You must be logged in to create a booking")}`,
    );
  }

  let booking;

  try {
    booking = await createBooking(bookingData);
  } catch (error) {
    const message = error.message || "Failed to create reservation";
    redirect(`/reservation/error?message=${encodeURIComponent(message)}`);
  }

  revalidatePath("/bookings");
  redirect(`/reservation/success/${booking._id}`);
}

export async function createNewReview(data) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  const reviewData = {
    service: data.service,
    rating: data.rating,
    review: data.review,
    worker: data.worker,
    guest: session.user.guestId,
  };

  await createReview(reviewData);

  revalidatePath(`/bookings/${data.bookingId}`);
}

export async function cancelReservation(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("You must be logged in");
  }

  await cancelBooking({
    bookingId,
    guestEmail: session.user.email,
  });

  revalidatePath("/bookings");
  revalidatePath(`/bookings/${bookingId}`);

  return { success: true };
}
