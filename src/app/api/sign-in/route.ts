import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@/models/User";

export async function POST(req: Request, res: Response) {
  await connectDB();
  const data = await req.json();

  const { email, password } = data;
  const user = await User.findOne({ email }).select("+password").exec();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  return NextResponse.json({ token }, { status: 200 });
}
