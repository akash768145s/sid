// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure the user object is correctly populated
      if (token && token.email) {
        const digitalId = token.email.split("@")[0].slice(-7);
        session.user.digitalId = digitalId;
      }
      return session;
    },
    async signIn({ user }) {
      // Ensure that the user object has the email property
      if (user.email && user.email.endsWith("@ssn.edu.in")) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      // Ensure the user object is available and populated in the JWT callback
      if (user) {
        token.email = user.email;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
