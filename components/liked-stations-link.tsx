import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function LikedStationsLink() {
  return (
    <>
      <Show when="signed-in">
        <Link
          href="/my-stations"
          className="flex items-center h-10 md:px-4 rounded-md hover:bg-muted/10"
        >
          My Stations
        </Link>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="cursor-pointer h-10 md:px-4 rounded-md hover:bg-muted/10">
            My Stations
          </button>
        </SignInButton>
      </Show>
    </>
  );
}
