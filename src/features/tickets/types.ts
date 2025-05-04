import { LucideProps } from "lucide-react";

export type StatusIconComponent = React.FC<LucideProps>;

export enum TicketStatus {
  DONE = "DONE",
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
}

// export type Ticket = {
//   id: number;
//   title: string;
//   content: string;
//   status: TicketStatus;
// };
