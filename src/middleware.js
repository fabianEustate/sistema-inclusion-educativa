import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// Desactivar matcher (opcional pero recomendado)
export const config = {
  matcher: [],
};
