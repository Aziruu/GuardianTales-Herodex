import { NextResponse } from "next/server";
import heroes from "@/data/heroes.json";

export async function GET() {
  return NextResponse.json(heroes);
}
