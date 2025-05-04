import { TicketStatus } from "@/features/tickets/types";
import { PrismaClient, Prisma } from "../generated/prisma/client";


const prisma = new PrismaClient();

export const tickets: Prisma.TicketCreateManyInput[] = [
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
  try {
    await prisma.ticket.createMany({
      data: tickets,
    });
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};


seed()