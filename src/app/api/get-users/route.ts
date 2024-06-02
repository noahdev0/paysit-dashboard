import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  if (!req.headers.get("cookie")?.includes("token")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (req.headers.get("cookie")?.includes("role=user")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const users = await User.find().exec();

  return NextResponse.json(users);
}
