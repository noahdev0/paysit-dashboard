import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@/models/User";

export async function POST(req: Request, res: Response) {
  await connectDB();
  const data = await req.json();

  const { email, password } = data;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }
  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET!
  );

  const { password: _, role, ...userWithoutPassword } =  user.toObject();

  return NextResponse.json({ token, userWithoutPassword }, { status: 200 });
}

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ message: "Sign in route" }, { status: 405 });
}

export async function PUT(req: Request, res: Response) {
  return NextResponse.json({ message: "Sign in route" }, { status: 405 });
}
