import { FiltersSection } from "@/components/filters";
import { RandomiseButton } from "@/components/randomise-button";
import { Link } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8 items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome to RandomFM
        </h1>
        <p className="text-muted">
          You can simply find a random station or use the available filters to
          enhance your search.
        </p>
      </div>
      <FiltersSection />
      <RandomiseButton />
      <p className="text-muted">
        Made possible by{" "}
        <a
          href="https://www.radio-browser.info/"
          target="_blank"
          className="font-semibold hover:text-white"
        >
          Radio Browser API
        </a>
      </p>
    </div>
  );
};

export default HomePage;
