import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// get all teachers
export async function GET() {
  const response = await prisma.teacher.findMany();
  return NextResponse.json(response);
}

// add a new teacher
export async function POST(request) {
  const body = await request.json();
  const { name, gradeLevel, subject } = body;
  const newTeacher = await prisma.teacher.create({
    data: {
      name,
      gradeLevel,
      subject,
    },
  });
  return NextResponse.json(newTeacher);
}

// delete a teacher
export async function DELETE(request) {
  const { id } = await request.json();

  const deletedTeacher = await prisma.teacher.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deletedTeacher);
}
