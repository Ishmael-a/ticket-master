import { TicketStatus } from "@/features/tickets/types";
import { PrismaClient } from "../generated/prisma/client";
import { hash } from "@node-rs/argon2";


const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com"
  },
  {
    username: "ishmael_a",
    email: "abuishmaelyusif204@gmail.com"
  }
];

export const tickets= [
  {
    title: "User Authentication Bug",
    content:
      "Users unable to log in after recent password reset feature implementation. Error occurs when using social media login methods.",
    status: TicketStatus.OPEN,
  },
  {
    title: "Performance Optimization",
    content:
      "Database queries on the dashboard are slow. Need to review and optimize query performance, especially for large data sets.",
    status: TicketStatus.IN_PROGRESS,
  },
  {
    title: "Payment Gateway Integration",
    content:
      "Complete integration with Stripe payment gateway. Implement webhook handling and transaction logging.",
    status: TicketStatus.DONE,
  },
  {
    title: "Mobile Responsive Design",
    content:
      "Fix layout issues on smaller screen sizes. Ensure all components are properly aligned and functional on mobile devices.",
    status: TicketStatus.OPEN,
  },
  {
    title: "Security Vulnerability Patch",
    content:
      "Address potential cross-site scripting (XSS) vulnerability in user input fields. Implement additional input sanitization.",
    status: TicketStatus.IN_PROGRESS,
  },
];

// const seed = async () => {
//     // for(const ticket of tickets){
//     //     await prisma.ticket.create({
//     //         data: ticket
//     //     })
//     // }

//     await prisma.ticket.createMany({
//         data: tickets
//     })
// };

const seed = async () => {
    const t0 = performance.now()
  try {

    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();

    const passwordHash = await hash("secret");

    const dbUsers = await prisma.user.createManyAndReturn({
      data: users.map((user) => ({
        ...user,
        passwordHash
      })),
    });

    await prisma.ticket.createMany({
      data: tickets.map((ticket) => ({
        ...ticket,
        userId: dbUsers[0].id,
      })),
    });

    const t1 = performance.now();
    console.log(`Seed data inserted successfully. Finished in (${t1-t0} ms)`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};


seed()