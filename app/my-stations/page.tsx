import LikedStationsGrid from "@/components/liked-stations-grid";

export const dynamic = "force-dynamic";

const LikedStations = async () => {
  return (
    <div className="flex flex-col gap-8 items-start pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Stations</h1>
        <p>You can find and update your favorite stations right here.</p>
      </div>
      <LikedStationsGrid />
    </div>
  );
};

export default LikedStations;
