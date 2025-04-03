import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { TOGGL_BASE_URL } from "./constant";

declare module "next-auth" {
   interface User {
      accessToken: string;
      api_token: string;
      username: string;
   }

   interface Session {
      accessToken: string;
      api_token: string;
      user: {
         id: string;
         name: string;
         email: string;
         image?: string;
      };
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      accessToken: string;
      api_token: string;
      username: string;
   }
}

export const authOptions: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "Toggl",
         credentials: {
            username: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) {
               return null;
            }

            try {
               // Base64 encode the credentials for Basic Auth
               const auth = Buffer.from(
                  `${credentials.username}:${credentials.password}`
               ).toString("base64");

               const response = await fetch(`${TOGGL_BASE_URL}/me`, {
                  headers: {
                     Authorization: `Basic ${auth}`,
                     "Content-Type": "application/json",
                  },
               });

               const sessionCreationResponse = await fetch(
                  "https://accounts.toggl.com/api/sessions",
                  {
                     body: JSON.stringify({
                        email: credentials.username,
                        password: credentials?.password,
                     }),
                     method: "POST",
                     headers: {
                        Authorization: `Basic ${auth}`,
                        "Content-Type": "application/json",
                     },
                  }
               );

               const res = await sessionCreationResponse.json();
               console.log("session response -> ", res, "");

               if (!response.ok) {
                  throw new Error("Authentication failed");
               }

               const data = await response.json();

               return {
                  id: data?.id.toString(),
                  name: data?.fullname,
                  email: data?.email,
                  image: data?.image_url,
                  accessToken: auth,
                  username: credentials?.username,
                  api_token: data.api_token,
               };
            } catch (error) {
               console.error("Toggl authentication error:", error);
               return null;
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.accessToken = user.accessToken;
            token.id = user.id;
            token.api_token = user.api_token;
            token.username = user.username;
         }
         return token;
      },
      async session({ session, token }) {
         if (token) {
            session.accessToken = token.accessToken as string;
            session.user.id = token.id as string;
            session.api_token = token.api_token as string;
         }
         return session;
      },
   },
   pages: {
      signIn: "/auth/signin",
   },
   session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },
   secret: process.env.NEXTAUTH_SECRET,
};
