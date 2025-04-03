import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
   interface User {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken: string;
      api_token: string;
      username: string;
   }

   interface Session {
      accessToken: string;
      api_token: string;
      user: {
         id: string;
         name?: string | null;
         email?: string | null;
         image?: string | null;
      };
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      accessToken: string;
      api_token: string;
      username: string;
      id: string;
   }
}
