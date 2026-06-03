import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const favorites = await prisma.favorite.findMany({ where: { userId } });
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stationuuid, name, favicon, homepage, tags } = await req.json();
  if (!stationuuid || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const newFavorite = await prisma.favorite.create({
      data: { userId, stationuuid, name, favicon, homepage, tags },
    });
    return NextResponse.json({ newFavorite });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
