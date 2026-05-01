import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// PUT /api/packages/[id] - Update a package (Admin Only)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        title: data.title,
        duration: data.duration,
        groupSize: data.groupSize,
        totalPrice: data.totalPrice,
        perPerson: data.perPerson,
        features: Array.isArray(data.features) ? data.features : data.features.split('\n').filter(Boolean)
      }
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

// DELETE /api/packages/[id] - Delete a package (Admin Only)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.package.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
