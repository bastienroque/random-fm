"use client";

import { useState } from "react";
import Link from "next/link";

import { LikedStationsLink } from "./liked-stations-link";
import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import Logo from "./logo";
import { LogOut } from "lucide-react";

const links = [
  { label: "Tune-In", href: "/" },
  { label: "About", href: "/about" },
  { label: "Changelog", href: "/changelog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full p-2">
      <div className="h-16 mx-auto flex w-full max-w-6xl justify-between px-4 rounded-md dark:bg-background bg-foreground dark:text-foreground text-background">
        <Link
          aria-label="home page"
          href="/"
          className="flex items-center gap-4 text-xl font-bold tracking-wide"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-6 w-auto invert dark:invert-0" />
          <div className="relative">
            RandomFM{" "}
            <span className="absolute -top-2 -right-5 font-mono text-[11px] font-normal text-muted-foreground">
              v2
            </span>
          </div>
        </Link>
        <div className="flex gap-2 font-medium">
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-label={`${l.href} page`}
                className="flex items-center h-10 px-4 rounded-md hover:bg-muted/10"
              >
                {l.label}
              </Link>
            ))}
            <LikedStationsLink />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  aria-label="Sign in button"
                  className="rounded-md dark:bg-foreground bg-background dark:text-background text-foreground h-10 px-8 cursor-pointer hover:opacity-70"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  aria-label="Sign up button"
                  className="border rounded-md h-10 px-8 cursor-pointer hover:opacity-70"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <SignOutButton>
                <button
                  aria-label="Sign out button"
                  className="flex  items-center  gap-2 rounded-md dark:bg-foreground bg-background dark:text-background text-foreground font-medium text-sm sm:text-base h-10 px-6 cursor-pointer hover:opacity-70"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </SignOutButton>
            </Show>
            <ThemeToggle />
          </div>
        </div>

        <button
          className="flex md:hidden items-center justify-center rounded-md p-1.5 hover:bg-muted transition-colors "
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease rounded-md dark:bg-background bg-foreground dark:text-foreground text-background ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-start px-5 pb-4 pt-3 font-medium">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-label={`${l.href} page`}
                className="flex items-center h-10 rounded-md hover:bg-muted/10"
              >
                {l.label}
              </Link>
            ))}
            <LikedStationsLink />
          </div>
          <div className="my-2 h-px " />
          <div className="mx-auto w-full flex justify-between ">
            <div className="flex gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    aria-label="Sign in button"
                    className="rounded-md dark:bg-foreground bg-background dark:text-background text-foreground font-medium text-sm sm:text-base h-10 px-4 cursor-pointer hover:opacity-70"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    aria-label="Sign up button"
                    className="border rounded-md font-medium text-sm sm:text-base h-10 px-4 cursor-pointer hover:opacity-70"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <SignOutButton>
                  <button
                    aria-label="Sign out button"
                    className="flex  items-center  gap-1 rounded-md dark:bg-foreground bg-background dark:text-background text-foreground font-medium text-sm sm:text-base h-10 px-6 cursor-pointer hover:opacity-70"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </SignOutButton>
              </Show>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
