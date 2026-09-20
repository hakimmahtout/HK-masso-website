"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setService,
  setDuration,
} from "@/app/_lib/features/booking/bookingSlice";
import { useEffect } from "react";
import Image from "next/image";
import { useTranslations, useFormatter } from "next-intl";

export default function ServiceStep({ services = [], setIsValid }) {
  const t = useTranslations("ServiceStep");
  const formatCurrency = useFormatter();

  const service = useSelector((store) => store.booking.service);
  const duration = useSelector((store) => store.booking.duration);

  const dispatch = useDispatch();

  // 1. Auto-select first service if none selected
  useEffect(() => {
    if (services.length > 0 && !service) {
      dispatch(setService(services[0]));
    }
  }, [services, service, dispatch]);

  // 2. Auto-select first duration key without 'd' (e.g., "d30" -> "30")
  useEffect(() => {
    if (!service?.prices) return;

    const firstKey = Object.keys(service.prices)[0]; // e.g., "d30"
    if (firstKey) {
      const initialDuration = firstKey.replace("d", ""); // "30"
      dispatch(setDuration(initialDuration));
    }
  }, [service, dispatch]);

  // 3. Form validation update
  useEffect(() => {
    const isFormValid = service && duration && services.length;

    if (setIsValid) {
      setIsValid(Boolean(isFormValid));
    }
  }, [service, duration, services, setIsValid]);

  return (
    <div className="space-y-5">
      {/* Services List */}
      <div className="grid max-h-80 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
        {services.map((s) => {
          const minPrice = Math.min(
            ...Object.values(s.prices ?? { default: 0 }),
          );
          const formattedMinPrice = formatCurrency.number(minPrice, {
            style: "currency",
            currency: "USD",
          });

          return (
            <button
              key={s._id}
              type="button"
              onClick={() => dispatch(setService(s))}
              className={`flex items-center gap-3 rounded-md border p-3 text-start transition ${
                service?._id === s._id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="relative size-16 flex-shrink-0">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="64px"
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <strong className="block text-sm">{s.name}</strong>
                <span className="text-xs text-muted-foreground">
                  {t("fromPrice", { price: formattedMinPrice })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Duration Options */}
      <div>
        <h3 className="text-sm font-semibold">{t("chooseDuration")}</h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Object.entries(service?.prices ?? {}).map(([key, price]) => {
            const minutes = key.replace("d", ""); // Extracts "30" or "60"
            const formattedPrice = formatCurrency.number(price, {
              style: "currency",
              currency: "USD",
            });

            return (
              <button
                key={key}
                type="button"
                onClick={() => dispatch(setDuration(minutes))}
                className={`rounded-md border p-4 text-start transition ${
                  String(duration) === String(minutes)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm">
                  {t("minutesFormat", { count: Number(minutes) })}
                </span>
                <strong className="mt-1 block">{formattedPrice}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
