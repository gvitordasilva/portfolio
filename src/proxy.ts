import { NextRequest, NextResponse } from "next/server";

const locales = ["pt", "en"];
const COOKIE_KEY = "portfolio-lang";

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get(COOKIE_KEY)?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  return accept.startsWith("pt") || accept.includes(",pt") ? "pt" : "en";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${detectLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Ignora assets, metadata routes e arquivos estáticos.
  matcher: [
    "/((?!_next|api|projects|icon|opengraph-image|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)",
  ],
};
