import { NextResponse } from "next/server";

// Rutas públicas
const publicPaths = ["/login", "/inicio", "/noticias", "/eventos"];

// Rutas privadas por rol
const roleBasedRoutes = {
  administrador: ["/administrador"],
  docente: ["/docente"],
  tutor: ["/tutor"],
  psicologo: ["/psicologo"],
  psicólogo: ["/psicologo"],
};

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("accessToken")?.value || null;
  const rol = request.cookies.get("userRole")?.value || null;

  const isPublic = publicPaths.some((p) => path === p || path.startsWith(p));

  //  Permitir que el login cargue SIEMPRE
  if (path === "/login") return NextResponse.next();

  //  Intento de entrar a ruta privada sin token
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  Si ya está logueado e intenta ir a login
  if (token && path === "/login") {
    if (rol) {
      return NextResponse.redirect(new URL(`/${rol}/dashboard`, request.url));
    }
    return NextResponse.redirect(new URL("/inicio", request.url));
  }

  // Protección por roles
  if (token && rol) {
    const allowedRoutes = roleBasedRoutes[rol.toLowerCase()] || [];
    const allowed = allowedRoutes.some((route) => path.startsWith(route));

    if (!allowed && !isPublic) {
      return NextResponse.redirect(new URL(`/${rol}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

//  Middleware solo en rutas privadas
export const config = {
  matcher: [
    "/administrador/:path*",
    "/docente/:path*",
    "/tutor/:path*",
    "/psicologo/:path*",
  ],
};
