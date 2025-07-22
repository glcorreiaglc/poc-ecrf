import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const subject = await prisma.subject.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
      },
    });
    return NextResponse.json(subject);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create subject" },
      { status: 500 }
    );
  }
}
