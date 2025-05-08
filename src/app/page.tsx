import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { NotFound } from "@/components/not-found";
import { Heading } from "@/components/heading";
import TicketList from "@/features/tickets/components/ticket-list";
import { Spinner } from "@/components/spinner";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"All Tickets"}
        description={"Tickets By Everyone At One Place"}
      />

      <ErrorBoundary fallback={<NotFound label="Something Went Wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
