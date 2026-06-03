import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function LikedStationsLink() {
  return (
    <>
      <Show when="signed-in">
        <Link href="/my-stations">My Stations</Link>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="cursor-pointer">My Stations</button>
        </SignInButton>
      </Show>
    </>
  );
}
