import { NextResponse } from "next/server";
import heroes from "@/data/heroes.json";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const heroId = parseInt(params.id, 10);

  const hero = heroes.find((h) => h.id === heroId);

  if (!hero) {
    return NextResponse.json({ message: "Hero not Found" }, { status: 404 });
  }

  return NextResponse.json(hero);
}
