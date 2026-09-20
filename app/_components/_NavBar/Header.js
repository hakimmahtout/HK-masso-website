"use client";

import { useState } from "react";

import Logo from "@/app/_components/_NavBar/Logo";
import Navigation from "@/app/_components/_NavBar/Navigation";
import MobileNavigation from "@/app/_components/_NavBar/MobileNavigation";
import NavMenu from "@/app/_components/_NavBar/NavMenu";
import ModeButton from "@/app/_components/_NavBar/ModeButton";
import LanguageSwitcher from "@/app/_components/_NavBar/LanguageSwitcher";

export default function Header({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container flex h-18 items-center justify-between gap-5">
        <Logo />
        <Navigation />
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <ModeButton />
          {children}
        </div>
        <NavMenu setOpen={setOpen} />
      </div>
      {open && <MobileNavigation setOpen={setOpen} />}
    </header>
  );
}
