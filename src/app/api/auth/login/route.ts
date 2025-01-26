import { NextResponse } from "next/server";
import { hash, compare } from 'bcryptjs';
import User from "@models/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { email, password } = body;
    
    const user = await User.findOne({
      where: { email },
    });
    
    if (user == null) {
      console.log("\nUser not found\n");
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }
    
    console.log("\npassword\n", password);
    console.log("\nuser.password\n", user.password);
    console.log("\nawait bcrypt.compare(password, user.password)\n", await compare(password, user.password));

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      console.log("\nInvalid password\n");
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
