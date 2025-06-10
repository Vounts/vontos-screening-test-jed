import { PrismaClient } from "../lib/generated/prisma";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning existing data...");

  // Delete in reverse order of relations to avoid foreign key issues
  await prisma.assessment.deleteMany({});
  await prisma.competency.deleteMany({});
  await prisma.domain.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.teacher.deleteMany({});

  console.log("Seeding new data...");

  const teacherId = randomUUID();
  const mathId = randomUUID();
  const engId = randomUUID();

  const student1Id = randomUUID();
  const student2Id = randomUUID();

  const domain1Id = randomUUID();
  const domain2Id = randomUUID();

  const comp1Id = randomUUID();
  const comp2Id = randomUUID();
  const comp3Id = randomUUID();
  const comp4Id = randomUUID();

  // Create teacher
  await prisma.teacher.create({
    data: {
      id: teacherId,
      firstName: "John",
      lastName: "Doe",
      email: "teacher@example.com",
    },
  });

  // Create subjects
  await prisma.subject.createMany({
    data: [
      { id: mathId, name: "Math 101", teacherId },
      { id: engId, name: "English 202", teacherId },
    ],
  });

  // Create students
  await prisma.student.createMany({
    data: [
      {
        id: student1Id,
        firstName: "Alice",
        lastName: "Doe",
        email: "alice@example.com",
      },
      {
        id: student2Id,
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
      },
    ],
  });

  // Create domains with nested competencies
  await prisma.domain.create({
    data: {
      id: domain1Id,
      name: "Communication",
      competencies: {
        create: [
          { id: comp1Id, name: "Verbal" },
          { id: comp2Id, name: "Written" },
        ],
      },
    },
  });

  await prisma.domain.create({
    data: {
      id: domain2Id,
      name: "Logic",
      competencies: {
        create: [
          { id: comp3Id, name: "Problem Solving" },
          { id: comp4Id, name: "Reasoning" },
        ],
      },
    },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
