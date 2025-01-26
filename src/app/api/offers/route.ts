export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Offer from "@/models/offer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const where = {
      ...(category ? { category } : {}),
      isDeleted: null,
    };
    const offers = await Offer.findAll({ where });
    return NextResponse.json(offers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching offers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const data = await req.json();
    
    const offer = await Offer.create({
      ...data,
      userId: data.userId,
      isDeleted: null,
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating offer" },
      { status: 500 }
    );
  }
}
