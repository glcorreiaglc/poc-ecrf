import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const inclusions = await prisma.studyInclusion.findMany({
      where: { studyId: params.id },
      include: {
        subject: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inclusions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inclusions" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { subjectId } = await request.json();

    // Check if subject is already included in this study
    const existingInclusion = await prisma.studyInclusion.findUnique({
      where: {
        studyId_subjectId: {
          studyId: params.id,
          subjectId: subjectId,
        },
      },
    });

    if (existingInclusion) {
      return NextResponse.json(
        { error: "Subject already assigned to this study" },
        { status: 400 }
      );
    }

    const inclusion = await prisma.studyInclusion.create({
      data: {
        studyId: params.id,
        subjectId: subjectId,
      },
      include: {
        subject: true,
      },
    });

    return NextResponse.json(inclusion);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to assign subject" },
      { status: 500 }
    );
  }
}
