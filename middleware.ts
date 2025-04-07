import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;

   const publicPaths = ["/", "/api/auth/signin", "/api/auth/signout"];
   const isPublicPath = publicPaths.includes(path);

   const isApiPath = path.startsWith("/api") && !path.startsWith("/api/auth");

   const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
   });

   if (!isPublicPath && !token) {
      if (isApiPath) {
         return new NextResponse(
            JSON.stringify({ error: "Authentication required" }),
            {
               status: 401,
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
      }

      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
   }

   if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
   }

   return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
   matcher: [
      // Apply to all paths except static files, images, etc.
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg)).*)",
   ],
};
