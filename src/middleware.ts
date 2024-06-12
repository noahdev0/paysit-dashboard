import { auth, BASE_PATH } from "@/auth";

export default auth((req) => {
  if (req.method === "POST") {
    return;
  }
  if (!req.auth || (req.nextUrl.pathname === "/" && !req.auth)) {
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
