import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ stationuuid: string }> },
) {
  const { stationuuid } = await params;
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const deletedFavorite = await prisma.favorite.delete({
      where: {
        userId_stationuuid: { userId, stationuuid: stationuuid },
      },
    });
    return NextResponse.json({ deletedFavorite });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
