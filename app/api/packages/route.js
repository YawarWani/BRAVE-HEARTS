import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET /api/packages - Fetch all packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// POST /api/packages - Create a new package (Admin Only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    // Ensure images and features are arrays
    const newPackage = await prisma.package.create({
      data: {
        title: data.title,
        duration: data.duration,
        groupSize: data.groupSize,
        totalPrice: data.totalPrice,
        perPerson: data.perPerson,
        images: [
          "/images/about_pahalgam_1776581424655.png",
          "/images/gulmarg_snow_1776581444972.png",
          "/images/Gandola.jpg",
          "/images/hero_kashmir_1776581409040.png"
        ],
        features: Array.isArray(data.features) ? data.features : data.features.split('\n').filter(Boolean)
      }
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
