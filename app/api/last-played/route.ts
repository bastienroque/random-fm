import { prisma } from "@/lib/prisma";
import { fetchLastPlayedStation } from "@/lib/radio-browser";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stationuuid } = await req.json();
  if (!stationuuid) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const newLastPlayed = await prisma.lastPlayed.upsert({
      where: { userId },
      create: { userId, stationuuid },
      update: { stationuuid },
    });
    return NextResponse.json({ newLastPlayed });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const lastPlayed = await prisma.lastPlayed.findUnique({
      where: { userId },
    });
    if (!lastPlayed)
      return NextResponse.json(
        { error: "No last played station found" },
        { status: 404 },
      );
    const lastStation = await fetchLastPlayedStation(lastPlayed.stationuuid);
    if (!lastStation)
      return NextResponse.json(
        { error: "Last played station ins't available anymore" },
        { status: 404 },
      );
    return NextResponse.json({ lastStation });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
