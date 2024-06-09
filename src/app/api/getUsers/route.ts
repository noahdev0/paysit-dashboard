import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req: Request, res: Response) {
  await dbConnect();

  const users = await User.find({});
  const usersData = users.map((user) => {
    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toLocaleDateString("en-GB"),
      verified: user.verified,
      balance: user.balance,
    };
  });
  const count = users.length;

  return NextResponse.json({ usersData, count }, { status: 200 });
}

export async function POST(req: Request, res: Response) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PUT(req: Request, res: Response) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
