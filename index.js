import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//   await prisma.teacher.create({
//     data: {
//       name: "John Doe",
//       gradeLevel: "5th Grade",
//       subject: "Mathematics",
//     },
//   });

  const allUsers = await prisma.teacher.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
