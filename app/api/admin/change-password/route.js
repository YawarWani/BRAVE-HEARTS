import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username: session.user.name },
    });

    if (!admin) {
      return Response.json({ error: "Admin not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return Response.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { username: session.user.name },
      data: { password: hashed },
    });

    return Response.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error. Please try again." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
