import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";

export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth) {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  
};
