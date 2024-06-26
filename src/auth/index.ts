import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | any> {
        const user = {
          id: "test-user-1",
          userName: "admin",
          name: "Test 1",
          password: "admin",
          email: "test1@donotreply.com",
        };

        if (user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return { message: "Invalid credentials" };
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
