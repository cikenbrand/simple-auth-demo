import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: (user as any)._id.toString(),
          email: (user as any).email,
          username: (user as any).username, // Include username
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as unknown as { username: string }).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
