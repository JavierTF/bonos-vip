import { NextResponse } from "next/server";
import User from "@models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("body", body);

    const user = await User.create({
      ...body,
    });
    console.log(user);

    return NextResponse.json(
      { message: "Usuario creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear usuario", error },
      { status: 500 }
    );
  }
}
