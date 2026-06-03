import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col gap-12 items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          About RandomFM
        </h1>
      </div>
      <p className="text-muted">
        <span className="text-foreground font-mono text-sm">v1.0.0 </span>
        <br></br>A modern, minimal radio streaming app built with Next.js,
        TypeScript, Tailwind CSS, and the Radio Browser API. It lets you explore
        and stream live radio stations from around the world with a clean,
        responsive interface.
      </p>
      <p className="text-muted">
        <span className="text-foreground font-mono text-sm">v2.0.0 </span>
        <br></br>You can now register and create an account to save and like
        your favorite stations directly inside the app. Built with Clerk, Neon,
        and Prisma.
      </p>
      <div>
        <p className="text-muted">Including features such as:</p>
        <ul>
          <li>Search a random station</li>
          <li>Apply given filters</li>
          <li>Access radio's website</li>
          <li>Save and like any station</li>
          <li>Register an account</li>
          <li>Protected routes</li>
        </ul>
      </div>

      <footer>
        <p className="text-muted">
          Made possible with{" "}
          <Link
            href="https://www.radio-browser.info/"
            target="_blank"
            className="font-semibold hover:text-white"
          >
            Radio Browser API
          </Link>
        </p>
        <p className="text-muted">
          Developed by{" "}
          <Link
            href="https://github.com/bastienroque"
            target="_blank"
            className="font-semibold hover:text-white"
          >
            Bastien Roque
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default About;
