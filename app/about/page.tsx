import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col gap-12 max-w-3xl items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          About RandomFM
        </h1>
        <p className="whitespace-pre-line">
          {`This is a radio discovery app built around one idea: sometimes the best thing to listen to is something you'd never choose yourself.
        Tune into stations from across the world, filtered loosely by genre, language, or country — or leave everything open and let chance decide.`}
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">How it works </h1>
        <p className="whitespace-pre-line">
          {`Pick up to three filters — or none at all.
          Hit Tune In, a random station from Radio Browser's global database starts playing.
          Not what you wanted? Hit it again.
          Found something worth keeping? Create an account and save it to your collection.`}
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Built with </h1>
        <p className="whitespace-pre-line">
          {`RandomFM was built as a full-stack portfolio project using Next.js 15, React, TypeScript, Tailwind CSS, Sonner, Neon (serverless Postgres), Prisma, and Clerk for authentication.
          Station data is sourced entirely from the Radio Browser open API — a community-maintained, free database of radio stations from every corner of the planet.`}
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Future improvements{" "}
        </h1>
        <p className="whitespace-pre-line">
          {`- Search bar + filtering improvements
- Sleep timer
- Audio visualizer
- Custom lists for liked stations`}
        </p>
      </div>

      <footer>
        <p className="text-muted">
          Made possible with{" "}
          <Link
            href="https://www.radio-browser.info/"
            target="_blank"
            className="font-semibold hover:text-foreground dark:hover:text-background"
            aria-label="Link to Radio Browser API page"
          >
            Radio Browser API
          </Link>
        </p>
        <p className="text-muted">
          Developed by{" "}
          <Link
            href="https://github.com/bastienroque"
            target="_blank"
            className="font-semibold hover:text-foreground dark:hover:text-background"
            aria-label="Link to developer's GitHub page"
          >
            Bastien Roque
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default About;
