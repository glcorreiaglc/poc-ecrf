import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    await prisma.studyInclusion.delete({
      where: { id: params.inclusionId },
    });
    return NextResponse.json({
      message: "Subject removed from study successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove subject from study" },
      { status: 500 }
    );
  }
}
