import LikedStationsGrid from "@/components/liked-stations-grid";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const LikedStations = async () => {
  return (
    <div className="flex flex-col gap-8 items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Stations
        </h1>
        <p className="text-muted">
          You can find your favorite stations right here.
        </p>
      </div>
      <LikedStationsGrid />
    </div>
  );
};

export default LikedStations;
