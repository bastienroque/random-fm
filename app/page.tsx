import ButtonsWrapper from "@/components/buttonsWrapper";
import { FiltersSection } from "@/components/filters";

import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();
  const username = user?.username;
  const capitalizedUsername = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : null;

  const welcomeSuffix = capitalizedUsername
    ? `${capitalizedUsername} 👋`
    : "to RandomFM";

  return (
    <div className="flex flex-col gap-8 items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight ">
          Welcome {welcomeSuffix}
        </h1>
        <p>
          You can simply find a random station or use the available filters to
          enhance your search.
        </p>
      </div>
      <FiltersSection />
      <ButtonsWrapper />
    </div>
  );
};

export default HomePage;
