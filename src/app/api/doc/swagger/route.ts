import { NextResponse } from "next/server";
import { swaggerSpec } from "@/backend/lib/swagger";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(swaggerSpec);
}
