"use client";

import Link from "next/link";
import { LastPlayedStationButton } from "./last-played-station-button";
import { RandomiseButton } from "./randomise-button";
import { Show, SignInButton } from "@clerk/nextjs";
import { MouseEventHandler } from "react";

type Props = {
  handleClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const ButtonsWrapper = ({ handleClick }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <RandomiseButton />
      <Show when="signed-in">
        <p>Or alternatively,</p>
        <LastPlayedStationButton />
      </Show>
    </div>
  );
};

export default ButtonsWrapper;
