import { NextResponse } from "next/server";
import { compare } from 'bcryptjs';
import User from "@models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();    
    const { email, password } = body;
    
    const user = await User.findOne({
      where: { email },
    });
    
    if (user == null) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    console.log(_);
    
    return NextResponse.json({
      message: "Login exitoso",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error completo:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
