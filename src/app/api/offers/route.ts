export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Offer from "@/models/offer";
import { authOptions } from "@/lib/auth";

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
    return NextResponse.json(
      { error: "Error fetching offers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const offer = await Offer.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating offer" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...data } = await request.json();
    const offer = await Offer.findByPk(id);

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    await offer.update(data);
    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating offer" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const offer = await Offer.findByPk(id);

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    await offer.update({ isDeleted: new Date() });
    return NextResponse.json({ message: "Offer deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting offer" },
      { status: 500 }
    );
  }
}
