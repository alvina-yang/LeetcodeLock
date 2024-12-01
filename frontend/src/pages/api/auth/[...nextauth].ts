import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page URL
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      // After successful login, redirect to the onboarding page
      if (url === "/") {
        return baseUrl + "/onboarding"; // Custom redirect URL after login
      }
      return url;
    },
    async session({ session, token }: { session: any, token: any }) {
      // You can add any session data here
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
