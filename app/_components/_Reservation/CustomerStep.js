"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Field from "@/app/_ui/Field";
import { setGuestDetails } from "@/app/_lib/features/booking/bookingSlice";

const inputClass =
  "h-12 w-full rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground";

export default function CustomerStep({ user, setIsValid }) {
  const t = useTranslations("CustomerStep");
  const dispatch = useDispatch();

  const guestDetails = useSelector((state) => state.booking.guestDetails);
  const { fullName, gender, email, phone, notes } = guestDetails;

  // 1. Populate Redux store with user default data on initial load
  useEffect(() => {
    if (user) {
      dispatch(
        setGuestDetails({
          fullName: user.name || "",
          gender: user.gender || "",
          email: user.email || "",
        }),
      );
    }
  }, [user, dispatch]);

  // 2. Validate required fields whenever form values update
  useEffect(() => {
    const isFormValid =
      (fullName?.trim() || "") !== "" &&
      (gender || "") !== "" &&
      (email?.trim() || "") !== "" &&
      (phone?.trim() || "") !== "";

    if (setIsValid) {
      setIsValid(isFormValid);
    }
  }, [fullName, gender, email, phone, setIsValid]);

  // 3. Dispatch updates to Redux store on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setGuestDetails({ [name]: value }));
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label={t("labels.fullName")}>
        <input
          name="fullName"
          className={inputClass}
          required
          disabled
          value={fullName || ""}
          onChange={handleChange}
        />
      </Field>

      <Field label={t("labels.gender")}>
        <select
          name="gender"
          required
          className={inputClass}
          value={gender || ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            {t("placeholders.selectGender")}
          </option>
          <option value="male">{t("genderOptions.male")}</option>
          <option value="female">{t("genderOptions.female")}</option>
        </select>
      </Field>

      <Field label={t("labels.email")}>
        <input
          name="email"
          className={inputClass}
          required
          disabled
          value={email || ""}
          onChange={handleChange}
        />
      </Field>

      <Field label={t("labels.phone")}>
        <input
          name="phone"
          className={inputClass}
          required
          placeholder={t("placeholders.phone")}
          value={phone || ""}
          onChange={handleChange}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label={t("labels.notes")}>
          <textarea
            name="notes"
            className={`${inputClass} min-h-28 py-3`}
            placeholder={t("placeholders.notes")}
            value={notes || ""}
            onChange={handleChange}
          />
        </Field>
      </div>
    </div>
  );
}
