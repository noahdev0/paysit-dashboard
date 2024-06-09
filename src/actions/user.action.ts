import dbConnect from "@/lib/db";
import User from "@/models/User";
// app/actions/userActions.ts

export async function getUsers() {
  await dbConnect();
  const data = await User.find({});
  const users = data.map((user) => {
    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toString(),
      verified: user.verified,
    };
  });

  return users;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  await dbConnect();
  const user = new User(data);
  await user.save();
  return user;
}

export async function deleteUser(userId: string) {
  await dbConnect();
  const result = await User.findByIdAndDelete(userId);
  return result;
}

export async function updateUser(
  userId: string,
  data: Partial<{ name: string; email: string; password: string }>
) {
  await dbConnect();
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
  return updatedUser;
}
