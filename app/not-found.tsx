import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 ">
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" aria-label="Page Not Found, Return Home button">
        <h2 className="flex items-center w-fit gap-2 rounded-md bg-foreground dark:bg-background text-background dark:text-foreground font-semibold text-md h-10 px-6 cursor-pointer hover:opacity-70">
          Return Home
        </h2>
      </Link>
    </div>
  );
}
