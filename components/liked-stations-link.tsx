import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function LikedStationsLink() {
  return (
    <>
      <Show when="signed-in">
        <Link href="/liked-stations" className="text-white">
          Liked Stations
        </Link>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="text-white cursor-pointer">Liked Stations</button>
        </SignInButton>
      </Show>
    </>
  );
}
