import connectDB from "@/lib/db";
import { User } from "@/models/User";
("@/models/User");
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  await connectDB();
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
