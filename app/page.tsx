import { FiltersSection } from "@/components/filters";
import { RandomiseButton } from "@/components/randomise-button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const HomePage = async () => {
  const user = await currentUser();
  const username = user?.username;

  const welcomeSuffix = username ? `${username} 👋` : "to RandomFM";

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
      <RandomiseButton />
    </div>
  );
};

export default HomePage;
