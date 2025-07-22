import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const studies = await prisma.study.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(studies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch studies" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description } = await request.json();
    const study = await prisma.study.create({
      data: { name, description },
    });
    return NextResponse.json(study);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create study" },
      { status: 500 }
    );
  }
}
