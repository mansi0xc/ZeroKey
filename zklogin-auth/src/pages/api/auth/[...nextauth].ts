import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// Extend the existing types
declare module "next-auth" {
  interface Session {
    id_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.id_token = account.id_token; // Save JWT for zkLogin
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token; // Make it accessible in session
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/', // Error code passed in query string as ?error=
  },
});
