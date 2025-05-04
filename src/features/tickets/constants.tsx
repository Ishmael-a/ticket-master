import { StatusIconComponent, TicketStatus } from "./types"
import {
  CheckCircle2,
  Circle, 
  RefreshCw,
} from "lucide-react";

export const TICKET_ICONS: Record<TicketStatus, StatusIconComponent> = {
  [TicketStatus.DONE]: () => (
    <CheckCircle2 className="text-green-500" strokeWidth={2} />
  ),
  [TicketStatus.OPEN]: () => (
    <Circle className="text-gray-500" strokeWidth={2} />
  ),
  [TicketStatus.IN_PROGRESS]: () => (
    <RefreshCw className="text-blue-500 animate-spin" strokeWidth={2} />
  ),
};
