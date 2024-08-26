import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
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
      const adminEmail = process.env.NEXTAUTH_ADMIN_EMAIL;
      // Allow sign-in if the user has the admin email or an email ending with @ssn.edu.in
      if (user.email === adminEmail || user.email.endsWith("@ssn.edu.in")) {
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
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

// The correct way to export in Next.js API routes with the new app structure
export { handler as GET, handler as POST };


