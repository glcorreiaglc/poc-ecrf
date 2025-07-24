import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const study = await prisma.study.findUnique({
      where: { id: params.id },
      include: {
        inclusions: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!study) {
      return NextResponse.json({ error: "Study not found" }, { status: 404 });
    }

    return NextResponse.json(study);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch study" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { name, description } = await request.json();
    const study = await prisma.study.update({
      where: { id: params.id },
      data: { name, description },
    });
    return NextResponse.json(study);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update study" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.study.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Study deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete study" },
      { status: 500 }
    );
  }
}
