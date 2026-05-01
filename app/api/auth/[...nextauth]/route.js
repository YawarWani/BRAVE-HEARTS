import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Please enter username and password");
          }

          console.log("[AUTH] Attempting login for:", credentials.username);

          const admin = await prisma.admin.findUnique({
            where: { username: credentials.username }
          });

          if (!admin) {
            console.log("[AUTH] No admin found with username:", credentials.username);
            throw new Error("Invalid username or password");
          }

          console.log("[AUTH] Admin found, comparing password...");

          const passwordMatch = await bcrypt.compare(credentials.password, admin.password);

          if (!passwordMatch) {
            console.log("[AUTH] Password mismatch for:", credentials.username);
            throw new Error("Invalid username or password");
          }

          console.log("[AUTH] ✅ Login successful for:", credentials.username);
          return { id: admin.id, name: admin.username };
        } catch (err) {
          console.error("[AUTH] ❌ Error during authorize:", err.message);
          throw err;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
