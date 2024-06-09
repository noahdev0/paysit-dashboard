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
      async authorize(credentials): Promise<User | null> {
        const user = {
          id: "test-user-1",
          userName: "admin",
          name: "Test 1",
          password: "admin",
          email: "test1@donotreply.com",
        };

        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
