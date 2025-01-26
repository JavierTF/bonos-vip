import { NextResponse } from 'next/server';
import User from '@models/user';
import { hash, compare } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hashedPassword = await hash(body.password, 10);
    
    const user = await User.create({
      ...body,
      password: hashedPassword
    });

    console.log("user created", user);
    
    return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al crear usuario', error }, { status: 500 });
  }
}