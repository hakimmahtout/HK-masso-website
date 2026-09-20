import { auth } from "@/app/_lib/auth";

export const proxy = auth;

export const config = {
  matcher: ["/profile", "/reservation", "/bookings"],
};
