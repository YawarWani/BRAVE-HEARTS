import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET /api/packages
export async function GET() {
  try {
    console.log("GET /api/packages called");

    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log("Packages fetched successfully");
    console.log("Total packages:", packages.length);

    return NextResponse.json(packages);
  } catch (error) {
    console.error("GET /api/packages ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch packages",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/packages
export async function POST(request) {
  try {
    console.log("POST /api/packages called");

    const session = await getServerSession(authOptions);

    console.log("Session:", session);

    if (!session) {
      console.log("Unauthorized access");

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    console.log("Incoming data:", data);

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
          "/images/hero_kashmir_1776581409040.png",
        ],
        features: Array.isArray(data.features)
          ? data.features
          : data.features?.split("\n").filter(Boolean) || [],
      },
    });

    console.log("Package created:", newPackage);

    return NextResponse.json(newPackage, { status: 201 });

  } catch (error) {
    console.error("POST /api/packages ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create package",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}