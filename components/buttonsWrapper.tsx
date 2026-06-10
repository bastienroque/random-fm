"use client";

import { LastPlayedStationButton } from "./last-played-station-button";
import { RandomiseButton } from "./randomise-button";
import { ResetFiltersButton } from "./reset-filters-button";
import { Show } from "@clerk/nextjs";

const ButtonsWrapper = () => {
  return (
    <div className="flex w-full md:w-auto flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2">
        <RandomiseButton />
        <ResetFiltersButton />
      </div>
      <Show when="signed-in">
        <p>Or alternatively,</p>
        <LastPlayedStationButton />
      </Show>
    </div>
  );
};

export default ButtonsWrapper;
