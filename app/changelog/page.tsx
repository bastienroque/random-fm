const Changelog = () => {
  return (
    <div className="flex flex-col gap-12 items-start pb-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        Changelog history
      </h1>
      <div>
        <h3 className="font-mono">v1.0.0</h3>
        <p className="whitespace-pre-line">
          <span className="font-semibold">
            Stack: Next.js, React, TypeScript, Tailwind CSS, Radio Browser API
          </span>
          {`
          - Homepage with genre, language and country filters
- Single "Tune In" button fetching a random matching station
- Persistent player with volume control, shuffle and expand/collapse
- Fully responsive layout`}
        </p>
      </div>
      <div>
        <h3 className="font-mono">v2.0.0</h3>
        <p className="whitespace-pre-line">
          <span className="font-semibold">Stack: Neon, Prisma, Clerk</span>
          {`
          - User authentication via Clerk (sign up, sign in, modal flow)
- Save stations to a personal favorites list
- Liked Stations page protected by middleware`}
        </p>
      </div>
      <div>
        <h3 className="font-mono">v2.1.0</h3>
        <span className="font-semibold">Fixes and Updates</span>
        <p className="whitespace-pre-line">
          {`- Add theme toggle (dark/light)
- Update navbar
- Fix overall styling
- Add Changelog page
- Update About page content`}
        </p>
      </div>
      <div>
        <h3 className="font-mono">v2.1.1</h3>
        <span className="font-semibold">More Fixes and Updates</span>
        <p className="whitespace-pre-line">
          {`- Update security standards
          - Fix semantic HTML tags
- Update navbar styling
- Update player UI
- Add Aria-labels`}
        </p>
      </div>
      <div>
        <h3 className="font-mono">v2.2.0</h3>
        <span className="font-semibold">More Fixes and New Updates</span>
        <p className="whitespace-pre-line">
          {`- Navbar: Add Tune-In button
          - Update player width responsiveness
- Add Sign Out icon and fix its layout
- Add GA4 tracking script
- Fix long station loading
- Add pagination to liked stations
- Add 404 page
- Upgrade play button to component
- Improve pagination
- Add last played station button when logged-in
- Add toast notifications (Sonner)
- Update hover states
- Update reset filters button
- Add available stations counter`}
        </p>
      </div>
    </div>
  );
};

export default Changelog;
