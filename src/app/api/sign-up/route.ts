import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  await dbConnect();
  const data = await req.json();

  const {
    name,
    email,
    password,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    role,
  } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    role,
  });
  try {
    await user.save();
    return NextResponse.json({ message: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ message: "Sign in route" }, { status: 405 });
}

export async function PUT(req: Request, res: Response) {
  return NextResponse.json({ message: "Sign in route" }, { status: 405 });
}
