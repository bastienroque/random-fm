"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "next/image";
import { LikedStationsLink } from "./liked-stations-link";
import { Show, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

const links = [{ label: "About", href: "/about" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-background">
      <div className="h-16 mx-auto flex w-full max-w-6xl justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-4 text-xl text-foreground font-bold tracking-wide"
        >
          <Logo
            src="/random-fm-logo.svg"
            alt="RandomFM-Logo"
            width={25}
            height={25}
            className="h-6 w-auto"
          />
          RandomFM
        </Link>
        <div className="flex gap-4">
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <LikedStationsLink />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="border border-foreground text-foreground rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-foreground text-background rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <SignOutButton>
                <button className="border border-foreground text-foreground rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign Out
                </button>
              </SignOutButton>
            </Show>
          </div>
        </div>

        <button
          className="flex md:hidden items-center justify-center rounded-md p-1.5 hover:bg-muted transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-400 ease ${
          open ? "max-h-80 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-start px-5 pb-4 pt-3">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <LikedStationsLink />
          </div>
          <div className="my-2 h-px bg-border" />
          <div className="flex gap-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="border border-foreground text-foreground rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-foreground text-background rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <SignOutButton>
                <button className="border border-foreground text-foreground rounded-md font-medium text-sm sm:text-base h-10 px-8 cursor-pointer">
                  Sign Out
                </button>
              </SignOutButton>
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}
